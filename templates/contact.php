<?php
// contact.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once __DIR__ . '/config.php';

// PHPMailer
require_once __DIR__ . '/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/phpmailer/src/SMTP.php';
require_once __DIR__ . '/phpmailer/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ---------------------------
// CSRF token helper
// ---------------------------
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(24));
}
function check_csrf($token) {
    return hash_equals($_SESSION['csrf_token'] ?? '', $token ?? '');
}

// ---------------------------
// Current user (viewer)
// ---------------------------
$viewer = $_SESSION['user'] ?? null;
$viewer_id = $viewer['id'] ?? null;

// ---------------------------
// Profile user (by ?user_id or logged in viewer)
// ---------------------------
$profile_id = intval($_GET['user_id'] ?? $viewer_id ?? 0);
if ($profile_id <= 0) {
    header('Location: /');
    exit;
}

$getUser = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$getUser->execute([$profile_id]);
$profile = $getUser->fetch(PDO::FETCH_ASSOC);
if (!$profile) { echo "User not found."; exit; }

// ---------------------------
// Max upload size
// ---------------------------
define('MAX_UPLOAD_MB', 10);
define('MAX_UPLOAD_BYTES', MAX_UPLOAD_MB * 1024 * 1024);

// ---------------------------
// AJAX actions
// ---------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json; charset=utf-8');
    $action = $_POST['action'];

    if (!in_array($action, ['fetch_posts','fetch_reels'])) {
        if (!check_csrf($_POST['csrf_token'] ?? '')) {
            echo json_encode(['status'=>'error','message'=>'Invalid CSRF token']); exit;
        }
    }

    $requires_login = ['add_friend','remove_friend','create_post','create_reel','like_post','add_comment','send_message'];
    if (in_array($action, $requires_login) && !$viewer) {
        echo json_encode(['status'=>'error','message'=>'You must be logged in.']); exit;
    }

    try {
        // ---------------- Post ----------------
        if ($action === 'create_post') {
            $content = trim($_POST['content'] ?? '');
            if ($content === '') { echo json_encode(['status'=>'error','message'=>'Post cannot be empty']); exit; }

            $upload_path = __DIR__."/uploads/contact/{$viewer['username']}/post_".time()."/";
            if (!is_dir($upload_path)) mkdir($upload_path, 0755, true);
            $uploaded_file = '';
            if (isset($_FILES['file']) && $_FILES['file']['error'] === 0) {
                if ($_FILES['file']['size'] > MAX_UPLOAD_BYTES) {
                    echo json_encode(['status'=>'error','message'=>"File max size is ".MAX_UPLOAD_MB."MB"]); exit;
                }
                $uploaded_file = $upload_path.basename($_FILES['file']['name']);
                move_uploaded_file($_FILES['file']['tmp_name'], $uploaded_file);
            }

            $avatar = $viewer['avatar'] ?? $viewer['profile_photo'] ?? '';
            $stmt = $pdo->prepare("INSERT INTO posts (author_id, content, file_path, type, created_at) VALUES (?, ?, ?, 'post', NOW())");
            $stmt->execute([$viewer_id, $content, $uploaded_file]);
            $post_id = $pdo->lastInsertId();

            ob_start();
            render_post_row($pdo, [
                'id'=>$post_id,
                'author_id'=>$viewer_id,
                'content'=>$content,
                'file_path'=>$uploaded_file,
                'type'=>'post',
                'created_at'=>date('Y-m-d H:i:s'),
                'username'=>$viewer['username'],
                'avatar'=>$avatar
            ], $viewer_id);
            $html = ob_get_clean();
            echo json_encode(['status'=>'success','html'=>$html]); exit;
        }

        // ---------------- Reel ----------------
        if ($action === 'create_reel') {
            $upload_path = __DIR__."/uploads/contact/{$viewer['username']}/reel_".time()."/";
            if (!is_dir($upload_path)) mkdir($upload_path, 0755, true);

            if (!isset($_FILES['file']) || $_FILES['file']['error'] !== 0) {
                echo json_encode(['status'=>'error','message'=>'Video file required']); exit;
            }
            if ($_FILES['file']['size'] > MAX_UPLOAD_BYTES) {
                echo json_encode(['status'=>'error','message'=>"Video max size is ".MAX_UPLOAD_MB."MB"]); exit;
            }

            $uploaded_file = $upload_path.basename($_FILES['file']['name']);
            move_uploaded_file($_FILES['file']['tmp_name'], $uploaded_file);

            $avatar = $viewer['avatar'] ?? $viewer['profile_photo'] ?? '';
            $stmt = $pdo->prepare("INSERT INTO posts (author_id, content, file_path, type, created_at) VALUES (?, '', ?, 'reel', NOW())");
            $stmt->execute([$viewer_id, $uploaded_file]);
            $reel_id = $pdo->lastInsertId();

            ob_start();
            render_post_row($pdo, [
                'id'=>$reel_id,
                'author_id'=>$viewer_id,
                'content'=>'',
                'file_path'=>$uploaded_file,
                'type'=>'reel',
                'created_at'=>date('Y-m-d H:i:s'),
                'username'=>$viewer['username'],
                'avatar'=>$avatar
            ], $viewer_id);
            $html = ob_get_clean();
            echo json_encode(['status'=>'success','html'=>$html]); exit;
        }

        // ---------------- Like / Unlike ----------------
        if ($action === 'like_post') {
            $post_id = intval($_POST['post_id']);
            $q = $pdo->prepare("SELECT id FROM post_likes WHERE post_id=? AND user_id=?");
            $q->execute([$post_id,$viewer_id]);
            if ($q->rowCount()>0) {
                $pdo->prepare("DELETE FROM post_likes WHERE post_id=? AND user_id=?")->execute([$post_id,$viewer_id]);
                $liked = false;
            } else {
                $pdo->prepare("INSERT INTO post_likes (post_id,user_id,created_at) VALUES (?,?,NOW())")->execute([$post_id,$viewer_id]);
                $liked = true;
            }
            $count = (int)$pdo->query("SELECT COUNT(*) FROM post_likes WHERE post_id={$post_id}")->fetchColumn();
            echo json_encode(['status'=>'success','liked'=>$liked,'count'=>$count]); exit;
        }

        // ---------------- Add Comment ----------------
        if ($action === 'add_comment') {
            $post_id = intval($_POST['post_id']);
            $text = trim($_POST['text'] ?? '');
            if ($text === '') { echo json_encode(['status'=>'error','message'=>'Comment cannot be empty']); exit; }
            $pdo->prepare("INSERT INTO comments (post_id,user_id,text,created_at) VALUES (?,?,?,NOW())")->execute([$post_id,$viewer_id,$text]);
            $comment_id = $pdo->lastInsertId();
            echo json_encode(['status'=>'success','html'=>'<div><strong>'.htmlspecialchars($viewer['full_name'] ?? $viewer['username'] ?? '').'</strong>: '.htmlspecialchars($text).'</div>']); exit;
        }

        // ---------------- Messaging ----------------
        if ($action === 'send_message') {
            $to_user = intval($_POST['to_user']);
            $message = trim($_POST['message'] ?? '');
            if ($message===''){ echo json_encode(['status'=>'error','message'=>'Message empty']); exit; }
            $pdo->prepare("INSERT INTO messages (sender_id,receiver_id,message,created_at) VALUES (?,?,?,NOW())")->execute([$viewer_id,$to_user,$message]);
            echo json_encode(['status'=>'success','message'=>'Message sent']); exit;
        }

        // ---------------- Search Users ----------------
        if ($action === 'search_users') {
            $q = trim($_POST['query'] ?? '');
            $stmt = $pdo->prepare("SELECT * FROM users WHERE CONCAT_WS(' ',first_name,last_name,username,email) LIKE ? ORDER BY id DESC LIMIT 20");
            $stmt->execute(["%{$q}%"]);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            ob_start();
            foreach($users as $u){
                ?>
                <div class="user-card mb-2 p-2 border rounded d-flex align-items-center">
                    <div class="me-2"><?php echo avatar_tag($u) ?></div>
                    <div class="flex-fill">
                        <strong><?php echo htmlspecialchars($u['full_name'] ?? $u['username'] ?? '') ?></strong><br>
                        <small>@<?php echo htmlspecialchars($u['username'] ?? '') ?></small>
                    </div>
                    <div class="d-flex gap-1">
                        <a class="btn btn-sm btn-outline-primary" href="tel:<?php echo htmlspecialchars($u['fullphone'] ?? '') ?>">Call</a>
                        <a class="btn btn-sm btn-outline-success" href="sms:<?php echo htmlspecialchars($u['fullphone'] ?? '') ?>">Message</a>
                        <?php if(!empty($u['email'])): ?>
                        <a class="btn btn-sm btn-outline-warning" href="mailto:<?php echo htmlspecialchars($u['email']) ?>">Email</a>
                        <?php endif; ?>
                    </div>
                </div>
                <?php
            }
            echo json_encode(['status'=>'success','html'=>ob_get_clean()]); exit;
        }

    } catch(Exception $e){
        echo json_encode(['status'=>'error','message'=>'Server error: '.$e->getMessage()]); exit;
    }
}

// ---------------------------
// Rendering helpers
// ---------------------------
function avatar_tag($user){
    $a = $user['avatar'] ?? $user['profile_photo'] ?? '';
    $name = $user['full_name'] ?? $user['username'] ?? 'User';
    if($a) return '<img src="'.htmlspecialchars($a).'" class="rounded-circle" style="width:48px;height:48px;object-fit:cover">';
    $initial = strtoupper(substr($name,0,1));
    return '<div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style="width:48px;height:48px;font-weight:600;">'.htmlspecialchars($initial).'</div>';
}

function render_post_row($pdo,$p,$viewer_id=null){
    $post_id = $p['id'];
    ?>
    <div class="card mb-3" id="post-<?php echo $post_id ?>">
        <div class="card-body">
            <div class="d-flex mb-2">
                <div class="me-2"><?php echo avatar_tag($p) ?></div>
                <div>
                    <strong><?php echo htmlspecialchars($p['username'] ?? '') ?></strong><br>
                    <small class="text-muted"><?php echo htmlspecialchars($p['created_at'] ?? '') ?></small>
                </div>
            </div>
            <div class="mb-2"><?php echo nl2br(htmlspecialchars($p['content'] ?? '')) ?></div>
            <?php if(!empty($p['file_path'])): ?>
                <?php if(($p['type'] ?? 'post') === 'reel'): ?>
                    <video class="w-100" autoplay loop muted playsinline controls>
                        <source src="<?php echo htmlspecialchars(str_replace(__DIR__, '', $p['file_path'])) ?>" type="video/mp4">
                    </video>
                <?php else: ?>
                    <img src="<?php echo htmlspecialchars(str_replace(__DIR__, '', $p['file_path'])) ?>" class="img-fluid rounded">
                <?php endif; ?>
            <?php endif; ?>
            <div class="d-flex gap-2 mt-2">
                <button class="btn btn-sm btn-light like-btn" data-post="<?php echo $post_id ?>">Like</button>
                <button class="btn btn-sm btn-light comment-toggle" data-post="<?php echo $post_id ?>">Comment</button>
                <button class="btn btn-sm btn-light share-btn" data-post="<?php echo $post_id ?>">Share</button>
            </div>
        </div>
    </div>
    <?php
}

// ---------------------------
// HTML Page
// ---------------------------
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title><?php echo htmlspecialchars($profile['full_name'] ?? $profile['username']) ?> • Shopnoltd</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
body{background:#f3f4f6;}
.card{border-radius:12px;}
.user-card img{width:48px;height:48px;object-fit:cover;}
textarea{resize:none;}
</style>
</head>
<body>
<div class="container py-3">

    <!-- Back button -->
    <div class="mb-3">
        <?php
        if(($viewer['user_role']??'')==='admin') echo '<a href="/admindashboard.php" class="btn btn-secondary">&larr; Back</a>';
        else echo '<a href="/dashboard.php" class="btn btn-secondary">&larr; Back</a>';
        ?>
    </div>

    <!-- Users search -->
    <div class="mb-3">
        <input type="text" id="user-search" class="form-control" placeholder="Search users...">
    </div>

    <!-- Feed -->
    <div id="feed">
        <?php
        // Load initial posts/reels
        $stmt = $pdo->query("SELECT p.*, u.username, u.avatar, u.profile_photo FROM posts p JOIN users u ON p.author_id=u.id ORDER BY p.created_at DESC LIMIT 20");
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach($posts as $p) render_post_row($pdo,$p,$viewer_id);
        ?>
    </div>

</div>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script>
$(function(){
    $('#user-search').on('input',function(){
        var q=$(this).val();
        $.post('contact.php',{action:'search_users',query:q,csrf_token:'<?php echo $_SESSION['csrf_token']?>'},function(r){
            if(r.status==='success') $('#feed').html(r.html);
        },'json');
    });
});
</script>
</body>
</html>
