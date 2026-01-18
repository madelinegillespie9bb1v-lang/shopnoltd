<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/_common_rates.php';

// ✅ Check admin login
$user = $_SESSION['user'] ?? null;
if (!$user || ($user['user_role'] ?? '') !== 'admin') {
    header('Location: /login.php');
    exit;
}

// ✅ Fetch job_work ID
$work_id = intval($_GET['id'] ?? 0);
if (!$work_id) {
    die("❌ Invalid work reference.");
}

// ✅ Fetch submitted job details
$stmt = $pdo->prepare("
    SELECT jw.*, j.title, j.description, j.per_task_rate
    FROM job_work jw
    JOIN jobs j ON jw.job_id = j.id
    WHERE jw.id = ?
");
$stmt->execute([$work_id]);
$job_work = $stmt->fetch(PDO::FETCH_ASSOC);
if (!$job_work) {
    die("❌ Job submission not found.");
}

// ✅ Handle form submission
$errors = [];
$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $status = $_POST['status'] ?? '';
    $fine = floatval($_POST['fine'] ?? 0);

    if (!in_array($status, ['approved','rejected'])) {
        $errors[] = "❌ Invalid status selected.";
    }

    if (empty($errors)) {
        $stmt = $pdo->prepare("
            UPDATE job_work
            SET status = ?, fine = ?, approved_at = NOW()
            WHERE id = ?
        ");
        $stmt->execute([$status, $fine, $work_id]);
        $success = "✅ Job submission has been updated successfully.";
        // Refresh data
        $stmt = $pdo->prepare("SELECT * FROM job_work WHERE id=?");
        $stmt->execute([$work_id]);
        $job_work = $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Approve Job Submission #<?= $work_id ?></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
.instructions{background:#fdf8e4;padding:10px;border-left:5px solid #f0ad4e;margin-bottom:10px;}
img.screenshot{max-width:100%;border:1px solid #ccc;margin-bottom:10px;}
</style>
</head>
<body class="bg-light">
<div class="container py-4">
<h2>Approve Job Submission #<?= $work_id ?></h2>
<a href="/my_work_list.php" class="btn btn-secondary mb-3">⬅ Back to Submissions</a>

<?php if($errors): ?>
<div class="alert alert-danger"><ul><?php foreach($errors as $e) echo "<li>$e</li>"; ?></ul></div>
<?php endif; ?>

<?php if($success): ?>
<div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
<?php endif; ?>

<div class="card mb-3">
    <div class="card-body">
        <h5><?= htmlspecialchars($job_work['title'] ?? '-') ?></h5>
        <p><?= nl2br(htmlspecialchars($job_work['description'] ?? '-')) ?></p>
        <p><strong>Worker:</strong> <?= htmlspecialchars($job_work['worker_username']) ?></p>
        <p><strong>Platform:</strong> <?= htmlspecialchars($job_work['platform']) ?></p>
        <p><strong>Category:</strong> <?= htmlspecialchars($job_work['category']) ?></p>
        <p><strong>Rate:</strong> $<?= number_format($job_work['per_task_rate'] ?? 0, 4) ?></p>
        <p><strong>Job Link:</strong> <a href="<?= htmlspecialchars($job_work['job_link']) ?>" target="_blank">Open Link</a></p>
        <div class="instructions">
            <strong>Before Screenshot:</strong><br>
            <?php if($job_work['screenshot_before']): ?>
                <img src="<?= htmlspecialchars($job_work['screenshot_before']) ?>" class="screenshot">
            <?php else: ?>
                N/A
            <?php endif; ?>
        </div>
        <div class="instructions">
            <strong>After Screenshot:</strong><br>
            <?php if($job_work['screenshot_after']): ?>
                <img src="<?= htmlspecialchars($job_work['screenshot_after']) ?>" class="screenshot">
            <?php else: ?>
                N/A
            <?php endif; ?>
        </div>
    </div>
</div>

<form method="post" class="card card-body">
    <div class="mb-3">
        <label>Status:</label>
        <select name="status" class="form-select">
            <option value="approved" <?= ($job_work['status']=='approved')?'selected':'' ?>>✅ Approve</option>
            <option value="rejected" <?= ($job_work['status']=='rejected')?'selected':'' ?>>❌ Reject</option>
        </select>
    </div>
    <div class="mb-3">
        <label>Fine (if any):</label>
        <input type="number" step="0.0001" name="fine" class="form-control" value="<?= number_format($job_work['fine'] ?? 0,4) ?>">
    </div>
    <button type="submit" class="btn btn-success">Update Submission</button>
</form>

</div>
</body>
</html>
