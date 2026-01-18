<?php  
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/_common_rates_worker.php';

// ✅ Ensure user is logged in
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
    header('Location: job_explorer.php?error=no_platform');
    exit;
}

// ✅ Fetch number of open jobs per task type and average worker rate
$categoryCounts = [];
$categoryRates  = [];

try {
    if ($user_role === 'admin') {
        $stmt = $pdo->prepare("
            SELECT task_type, COUNT(*) AS total, AVG(worker_rate) AS avg_worker_rate
            FROM jobs
            WHERE status='open' AND platform=?
            GROUP BY task_type
        ");
        $stmt->execute([$platform]);
    } else {
        $stmt = $pdo->prepare("
            SELECT task_type, COUNT(*) AS total, AVG(worker_rate) AS avg_worker_rate
            FROM jobs
            WHERE status='open' AND platform=? AND poster_id!=?
            GROUP BY task_type
        ");
        $stmt->execute([$platform, $user_id]);
    }

    foreach ($stmt as $row) {
        $categoryCounts[$row['task_type']] = (int)$row['total'];
        $categoryRates[$row['task_type']]  = (float)$row['avg_worker_rate'];
    }
} catch (PDOException $e) {
    die('Database error: ' . htmlspecialchars($e->getMessage()));
}

// ✅ Back link
$back_link = 'job_explorer.php';
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
    transition: 0.25s ease;
}
.category-card:hover { 
    background: #f1f5ff; 
    box-shadow: 0 6px 15px rgba(0,0,0,0.15); 
    transform: translateY(-5px); 
}
h2 { text-align: center; margin-bottom: 25px; }
.back-btn { margin-bottom: 20px; }
.task-count { font-size: 1.2rem; font-weight: bold; color: #0d6efd; display: block; margin-top: 5px; }
</style>
</head>
<body>
<div class="container py-4">

    <!-- 🔙 Back -->
    <div class="mb-3">
        <a href="<?= $back_link ?>" class="btn btn-outline-secondary back-btn">
            <i class="bi bi-arrow-left-circle"></i> Back to Platforms
        </a>
    </div>

    <h2>Choose Task Category for <?= htmlspecialchars($platform) ?></h2>
    <p class="text-muted text-center">Select the type of task you want to do.</p>

    <div class="row justify-content-center">
        <?php 
        // Use categories from _common_rates_worker.php as default list
        $categories = getTasksByPlatform($platform);
        if (empty($categories)) $categories = ['Generic Task' => 0.0000, 'Other' => 0.0000];

        foreach ($categories as $task_type => $defaultRate): 
            $openCount = $categoryCounts[$task_type] ?? 0;
            $rate      = $categoryRates[$task_type] ?? $defaultRate; // Use DB rate if exists, otherwise default
        ?>
            <div class="col-md-3 col-sm-4 col-6">
                <a href="open_job_list.php?platform=<?= urlencode($platform) ?>&task_type=<?= urlencode($task_type) ?>" style="text-decoration:none;">
                    <div class="category-card">
                        <i class="bi bi-list-task fs-3 text-primary"></i>
                        <div><?= htmlspecialchars($task_type) ?></div>
                        <small class="text-muted">Rate: $<?= number_format($rate, 4) ?></small>
                        <span class="task-count"><?= $openCount ?> Open</span>
                    </div>
                </a>
            </div>
        <?php endforeach; ?>
    </div>

</div>
</body>
</html>
