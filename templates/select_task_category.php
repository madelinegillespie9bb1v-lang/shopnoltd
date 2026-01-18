<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';

// ✅ Use worker version so all users (including workers) get proper rate info
require_once $_SERVER['DOCUMENT_ROOT'] . '/_common_rates_worker.php';

// ✅ Check if user is logged in
$current_user = $_SESSION['user'] ?? null;
if (!$current_user) {
    header('Location: /login.php');
    exit;
}

$user_id   = $current_user['id'];
$user_role = $current_user['user_role'] ?? 'user';

// ✅ Get selected platform
$platform = $_GET['platform'] ?? '';
if (!$platform) {
    header('Location: post_job.php?error=no_platform');
    exit;
}

// ✅ Get task categories for this platform
$categories = $TASK_RATES[$platform] ?? [];

// ✅ Optional fallback if platform has no tasks
if (empty($categories)) {
    $categories = ['Generic Task' => 0.0000, 'Other' => 0.0000];
}

// ✅ Determine back link dynamically
$back_link = 'post_job.php'; // go back to platform selection
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Select Task Category – <?= htmlspecialchars($platform) ?></title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<style>
body { background-color: #f8f9fa; }
.category-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    margin-bottom: 15px;
    transition: 0.2s;
}
.category-card:hover {
    background: #f1f5ff;
    box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}
h2 { text-align: center; margin-bottom: 25px; }
.back-btn { margin-bottom: 20px; }
</style>
</head>
<body>
<div class="container py-4">

    <!-- 🔙 Back button -->
    <div class="mb-3">
        <a href="<?= $back_link ?>" class="btn btn-outline-secondary back-btn">
            <i class="bi bi-arrow-left-circle"></i> Back to Platforms
        </a>
    </div>

    <h2>Choose Task Category for <?= htmlspecialchars($platform) ?></h2>
    <p class="text-muted text-center">Select the type of task you want to post.</p>

    <!-- 💠 Task Category Grid -->
    <div class="row justify-content-center">
        <?php foreach ($categories as $task_type => $rate): ?>
            <div class="col-md-3 col-sm-4 col-6">
                <a href="post_job_form.php?platform=<?= urlencode($platform) ?>&task_type=<?= urlencode($task_type) ?>" style="text-decoration:none;">
                    <div class="category-card">
                        <i class="bi bi-list-task fs-3 text-primary"></i>
                        <div><?= htmlspecialchars($task_type) ?></div>
                        <small class="text-muted">Rate: $<?= number_format($rate, 4) ?></small>
                    </div>
                </a>
            </div>
        <?php endforeach; ?>
    </div>

</div>
</body>
</html>
