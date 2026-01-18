<?php  
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/_common_rates.php';

// ✅ Check if user logged in
$user = $_SESSION['user'] ?? null;
if (!$user) {
    header('Location: /login.php');
    exit;
}

// ✅ Validate role
$role = $user['user_role'] ?? '';
if (!in_array($role, ['admin', 'user'])) {
    header('Location: /login.php');
    exit;
}

// ✅ Platforms list
$platforms = [
    'Facebook', 'YouTube', 'Instagram', 'TikTok', 'X',
    'Gmail', 'Outlook', 'Yahoo', 'ProtonMail',
    'Payoneer', 'Paypal', 'Skrill', 'Stripe',
    'WhatsApp', 'Telegram', 'Signal', 'Messenger',
    'LinkedIn', 'Reddit', 'Pinterest', 'Snapchat',
    'Google Maps', 'Fiverr', 'Upwork', 'Other'
];

// ✅ Fetch open jobs count per platform
$openJobs = [];
try {
    $stmt = $pdo->query("SELECT platform, COUNT(*) AS total FROM jobs WHERE status='open' GROUP BY platform");
    foreach ($stmt as $row) {
        $platformName = trim($row['platform']);
        $openJobs[$platformName] = (int)$row['total'];
    }
} catch (PDOException $e) {
    die('Database error: ' . htmlspecialchars($e->getMessage()));
}

// ✅ Helper: map platform to gradient class
function getPlatformGradient($platform) {
    $p = strtolower($platform);
    if (strpos($p, 'facebook') !== false) return 'bg-gradient-facebook';
    if (strpos($p, 'youtube') !== false) return 'bg-gradient-youtube';
    if (strpos($p, 'instagram') !== false) return 'bg-gradient-instagram';
    if (strpos($p, 'tiktok') !== false) return 'bg-gradient-tiktok';
    if ($p === 'x') return 'bg-gradient-x';
    return 'bg-gradient-default';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Explore Open Jobs</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<style>
body { background-color: #f8f9fa; }
.platform-card {
    border-radius: 15px; padding: 20px; text-align: center;
    color: white; font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.25s ease-in-out;
}
.platform-card:hover { transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
.bg-gradient-facebook   { background: linear-gradient(135deg, #1877f2, #4da3ff); }
.bg-gradient-youtube    { background: linear-gradient(135deg, #ff0000, #ff6666); }
.bg-gradient-instagram  { background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af); }
.bg-gradient-tiktok     { background: linear-gradient(135deg, #000000, #69c9d0, #ee1d52); }
.bg-gradient-x          { background: linear-gradient(135deg, #000000, #1DA1F2); }
.bg-gradient-default    { background: linear-gradient(135deg, #6c757d, #adb5bd); }
.platform-count { font-size: 1.8rem; font-weight: bold; }
</style>
</head>
<body>
<div class="container py-4">

    <!-- 🔙 Back -->
    <div class="mb-3">
        <a href="<?= ($role === 'admin') ? '/admindashboard.php' : '/dashboard.php' ?>" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left-circle"></i> Back to Dashboard
        </a>
    </div>

    <h2 class="text-center mb-3">🌍 Explore Open Jobs</h2>
    <p class="text-muted text-center">Select a platform to view available open jobs.</p>

    <div class="row justify-content-center">
        <?php foreach ($platforms as $platformName):
            $count = $openJobs[$platformName] ?? 0;
            $bgClass = getPlatformGradient($platformName);
        ?>
        <div class="col-md-3 col-sm-4 col-6 mb-4">
            <a href="select_open_jobs.php?platform=<?= urlencode($platformName) ?>" style="text-decoration:none;">
                <div class="platform-card <?= $bgClass; ?>">
                    <div class="mb-1"><i class="bi bi-briefcase-fill fs-2"></i></div>
                    <div><?= htmlspecialchars($platformName); ?></div>
                    <div class="platform-count"><?= number_format($count); ?></div>
                    <small>Open Jobs</small>
                </div>
            </a>
        </div>
        <?php endforeach; ?>
    </div>

</div>
</body>
</html>
