<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/_common_rates_worker.php';

// ✅ Ensure PDO connection exists
if (!isset($pdo)) {
    die("❌ Database connection not established.");
}

// ✅ Check login
$current_user = $_SESSION['user'] ?? null;
if (!$current_user) {
    header('Location:/login.php');
    exit;
}

$worker_id       = $current_user['id'];
$worker_username = $current_user['username'] ?? 'user';

// ✅ Job reference check
$job_id = intval($_REQUEST['job_id'] ?? 0);
if (!$job_id) {
    echo "<script>alert('❌ Invalid job reference.');window.location.href='/open_job_list.php';</script>";
    exit;
}

// ✅ Fetch job info
$stmt = $pdo->prepare("
    SELECT j.*, u.username AS poster_username
    FROM jobs j
    JOIN users u ON j.poster_id = u.id
    WHERE j.id = ?
");
$stmt->execute([$job_id]);
$job = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$job) {
    echo "<script>alert('❌ Job not found.');window.location.href='/open_job_list.php';</script>";
    exit;
}

$poster_username = $job['poster_username'];
$platform        = trim($job['platform'] ?? '');
$category        = trim($job['task_type'] ?? '');
$link            = trim($job['link'] ?? '');

// ✅ Return URL for Cancel/Back
$return_url = "/open_job_list.php?platform=" . urlencode($platform) . "&task_type=" . urlencode($category);
if (isset($_GET['cancel'])) {
    header("Location: " . $return_url);
    exit;
}

if (empty($platform) || empty($category)) {
    die("❌ Invalid platform or task type.");
}

// ✅ Fetch rates and instructions
$task_rate     = $job['worker_rate'] ?? getWorkerRate($platform, $category);
$admin_rate    = $job['admin_rate'] ?? getAdminRate($platform, $category);
$referrer_rate = $job['referrer_rate'] ?? getReferrerRate($platform, $category);
$instructions  = $job['instruction'] ?? getTaskInstruction($platform, $category);

// ✅ Prevent self-job
if ($poster_username === $worker_username) {
    die("❌ You cannot perform your own job.");
}

// ✅ Count stats (for sidebar or display)
$totalJobsCount      = (int)($pdo->query("SELECT COUNT(*) FROM jobs")->fetchColumn() ?: 0);
$openJobsCount       = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='open'")->fetchColumn() ?: 0);
$doneJobsCount       = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='completed'")->fetchColumn() ?: 0);
$cancelJobsCount     = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='closed'")->fetchColumn() ?: 0);
$pendingJobsCount    = (int)($pdo->query("SELECT COUNT(*) FROM jobs WHERE status='pending_approval'")->fetchColumn() ?: 0);
$userCount           = (int)($pdo->query("SELECT COUNT(*) FROM users")->fetchColumn() ?: 0);

// ✅ Fetch submission stats dynamically
$taskCountsStmt = $pdo->prepare("
    SELECT 
        COUNT(*) AS total_submitted,
        SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) AS rejected
    FROM job_work
    WHERE job_id = ?
");
$taskCountsStmt->execute([$job_id]);
$taskCounts = $taskCountsStmt->fetch(PDO::FETCH_ASSOC);

$totalSubmitted = (int)($taskCounts['total_submitted'] ?? 0);
$remainingTasks = max(0, (int)$job['total_tasks'] - $totalSubmitted);

// ✅ Prevent duplicate submission (unless rejected)
$stmt = $pdo->prepare("
    SELECT id, status
    FROM job_work
    WHERE job_id = ? AND worker_username = ?
    ORDER BY submitted_at DESC LIMIT 1
");
$stmt->execute([$job_id, $worker_username]);
$previous = $stmt->fetch(PDO::FETCH_ASSOC);
if ($previous && $previous['status'] !== 'rejected') {
    die("❌ You have already submitted this job or it's under review.");
}

// ✅ Prepare directories for screenshots
$timestamp = date('Y-m-d_His');
$before_screenshot = $after_screenshot = '';
$base_dir = $_SERVER['DOCUMENT_ROOT'] . "/uploads/open_job_list/" . 
    "{$poster_username}/{$worker_username}/" . 
    "{$platform}/{$category}/{$timestamp}/";

if (!is_dir($base_dir) && !mkdir($base_dir, 0777, true)) {
    die("❌ Failed to create upload directory.");
}

$base_url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $base_dir);

// ✅ Fetch referrer
$referrerStmt = $pdo->prepare("SELECT referrer FROM users WHERE username = ?");
$referrerStmt->execute([$worker_username]);
$referrer_username = $referrerStmt->fetchColumn() ?: null;

// ================== Handle form submission ==================
$errors = [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    foreach (['before', 'after'] as $type) {
        $data = $_POST["{$type}_screenshot_base64"] ?? '';
        if ($data && preg_match('/^data:image\/(\w+);base64,/', $data, $m)) {
            $ext = strtolower($m[1]);
            $fileName = "{$type}_" . time() . ".$ext";
            $targetFile = $base_dir . $fileName;
            $parts = explode(',', $data);
            if (file_put_contents($targetFile, base64_decode($parts[1] ?? ''))) {
                ${$type . "_screenshot"} = $base_url . $fileName;
            } else {
                $errors[] = "❌ Failed to save $type screenshot.";
            }
        } else {
            $errors[] = "❌ " . ucfirst($type) . " screenshot required.";
        }
    }

    // ✅ Time limit (15 minutes)
    $started_at = intval($_POST['started_at'] ?? time());
    if (time() - $started_at > 900) $errors[] = "❌ Time expired!";

    if (empty($errors)) {
        $worker_earned   = $task_rate;
        $admin_earned    = $admin_rate;
        $referrer_earned = $referrer_username ? $referrer_rate : 0;

        // ✅ Insert new submission
        $stmt = $pdo->prepare("
            INSERT INTO job_work
            (job_id, worker_id, worker_username, referrer_username, poster_username, 
             platform, category, job_link, per_task_rate, worker_rate, admin_rate, referrer_rate,
             worker_earned, admin_earned, referrer_earned, screenshot_before, screenshot_after, 
             status, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
        ");
        $stmt->execute([
            $job_id,
            $worker_id,
            $worker_username,
            $referrer_username,
            $poster_username,
            $platform,
            $category,
            $link,
            $task_rate,
            $task_rate,
            $admin_rate,
            $referrer_rate,
            $worker_earned,
            $admin_earned,
            $referrer_earned,
            $before_screenshot,
            $after_screenshot
        ]);

        // ✅ Update job status counters (if columns exist)
        $updateStmt = $pdo->prepare("
            UPDATE jobs 
            SET pending_tasks = COALESCE(pending_tasks, 0) + 1,
                remaining_tasks = GREATEST(0, total_tasks - (SELECT COUNT(*) FROM job_work WHERE job_id = ?))
            WHERE id = ?
        ");
        $updateStmt->execute([$job_id, $job_id]);

        $success = "✅ Job submitted successfully!";
    }
}

if (empty($_POST)) $started_at = time();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Do Job – <?= htmlspecialchars($platform) ?> / <?= htmlspecialchars($category) ?></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body { background-color: #f8fafc; }
.container { background: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.instructions { background: #fff8e6; border-left: 5px solid #f59e0b; border-radius: 6px; }
#before_dropzone,#after_dropzone{border:2px dashed #ccc;padding:15px;text-align:center;cursor:pointer;background:white;margin-bottom:10px;}
img.preview{max-width:100%;margin-top:10px;border:1px solid #ccc;}
.timer{font-size:1.2em;font-weight:bold;color:red;}
.upload-btn{display:block;margin-top:5px;}
</style>
</head>
<body>
<div class="container py-4">
<h2>Do Job – <?= htmlspecialchars($platform) ?> / <?= htmlspecialchars($category) ?></h2>
<p><strong>Job Link:</strong>
<a href="<?= htmlspecialchars($link) ?>" target="_blank" class="btn btn-sm btn-outline-primary">Open Task Link</a>
<button type="button" class="btn btn-sm btn-outline-secondary" onclick="copyLink()">Copy Link</button>
</p>

<p><strong>Posted by:</strong> <?= htmlspecialchars($poster_username) ?></p>
<p><strong>Rate:</strong> $<?= number_format($task_rate, 4) ?></p>

<?php if(!empty($instructions)): ?>
<div class="instructions p-3 mb-3">
<h5>Task Instructions:</h5>
<p><?= nl2br(htmlspecialchars($instructions)) ?></p>
</div>
<?php endif; ?>

<?php if($errors): ?>
<div class="alert alert-danger"><ul><?php foreach($errors as $e) echo "<li>$e</li>"; ?></ul></div>
<?php endif; ?>

<?php if($success): ?>
<div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
<a href="<?= htmlspecialchars($return_url) ?>" class="btn btn-primary">Back to Open Jobs</a>
<?php else: ?>

<div class="alert alert-warning">You have <span id="timer" class="timer">15:00</span> minutes to complete this job.</div>

<form method="post">
<input type="hidden" name="started_at" value="<?= $started_at ?>">
<input type="hidden" name="before_screenshot_base64" id="before_screenshot_base64">
<input type="hidden" name="after_screenshot_base64" id="after_screenshot_base64">

<div>
<label>📸 Before Screenshot *</label>
<div id="before_dropzone">Paste your screenshot here (Ctrl+V)</div>
<input type="file" accept="image/*" id="before_upload" class="form-control upload-btn">
<img id="before_preview" class="preview" style="display:none;">
</div>

<div>
<label>📸 After Screenshot *</label>
<div id="after_dropzone">Paste your screenshot here (Ctrl+V)</div>
<input type="file" accept="image/*" id="after_upload" class="form-control upload-btn">
<img id="after_preview" class="preview" style="display:none;">
</div>

<button type="submit" class="btn btn-primary mt-3">Submit Job</button>
<a href="?cancel=1&job_id=<?= $job_id ?>" class="btn btn-secondary mt-3">Cancel</a>
</form>

<script>
// Countdown 15 minutes
let seconds = 900;
const timerElem = document.getElementById('timer');
const countdown = setInterval(()=>{
    let m=Math.floor(seconds/60);
    let s=seconds%60;
    timerElem.textContent=`${m}:${s.toString().padStart(2,'0')}`;
    if(seconds<=0){
        clearInterval(countdown);
        alert("⏰ Time expired!");
        window.location.href='<?= addslashes($return_url) ?>';
    }
    seconds--;
},1000);

// Screenshot paste/upload handlers
function setupImageHandler(dropzoneId, inputId, previewId, uploadId){
    const input=document.getElementById(inputId);
    const preview=document.getElementById(previewId);
    const upload=document.getElementById(uploadId);

    document.getElementById(dropzoneId).addEventListener('paste',function(e){
        const items=e.clipboardData.items;
        for(let i=0;i<items.length;i++){
            if(items[i].type.indexOf('image')!==-1){
                const file=items[i].getAsFile();
                const reader=new FileReader();
                reader.onload=function(evt){
                    input.value=evt.target.result;
                    preview.src=evt.target.result;
                    preview.style.display='block';
                };
                reader.readAsDataURL(file);
                e.preventDefault();
                break;
            }
        }
    });

    upload.addEventListener('change',function(e){
        const file=e.target.files[0];
        if(!file)return;
        const reader=new FileReader();
        reader.onload=function(evt){
            input.value=evt.target.result;
            preview.src=evt.target.result;
            preview.style.display='block';
        };
        reader.readAsDataURL(file);
    });
}
setupImageHandler('before_dropzone','before_screenshot_base64','before_preview','before_upload');
setupImageHandler('after_dropzone','after_screenshot_base64','after_preview','after_upload');

function copyLink(){
    navigator.clipboard.writeText('<?= addslashes($link) ?>').then(()=>{
        alert('✅ Link copied!');
    }).catch(()=>{
        alert('❌ Failed to copy link.');
    });
}
</script>

<?php endif; ?>
</div>
</body>
</html>
