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

// ✅ Allow both admin and user
$role = $user['user_role'] ?? '';
if (!in_array($role, ['admin', 'user'])) {
    header('Location: /login.php');
    exit;
}

// 🧭 List of supported platforms
$platforms = [
    'Facebook', 'YouTube', 'Instagram', 'TikTok', 'X',         // Social Media
    'Gmail', 'Outlook', 'Yahoo', 'ProtonMail',                 // Email
    'Payoneer', 'Paypal', 'Skrill', 'Stripe',                  // Payment
    'WhatsApp', 'Telegram', 'Signal', 'Messenger',             // Messaging
    'LinkedIn', 'Reddit', 'Pinterest', 'Snapchat',             // Social / Networking
    'Google Maps', 'Fiverr', 'Upwork',                         // Freelance / Maps
    'Other'                                                    // Custom
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Post a New Job</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<style>
body {
    background-color: #f8f9fa;
}
.platform-card {
    background: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    margin-bottom: 15px;
    transition: 0.2s;
}
.platform-card:hover {
    background: #f1f5ff;
    box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}
h2 {
    text-align: center;
    margin-bottom: 25px;
}
.back-btn {
    margin-bottom: 20px;
}
</style>
</head>
<body>
<div class="container py-4">

    <!-- 🔙 Back button -->
    <div class="mb-3">
        <a href="<?= ($user['user_role'] === 'admin') ? '/admindashboard.php' : '/dashboard.php' ?>" 
           class="btn btn-outline-secondary back-btn">
            <i class="bi bi-arrow-left-circle"></i> Back to Dashboard
        </a>
    </div>

    <!-- 🧭 Header -->
    <h2>Select Platform to Post Job</h2>
    <p class="text-muted text-center">
        Choose the platform where you want to create the job.
    </p>

    <!-- 💠 Platform Grid -->
    <div class="row justify-content-center">
        <?php foreach ($platforms as $p): ?>
            <div class="col-md-3 col-sm-4 col-6 mb-3">
                <a href="select_task_category.php?platform=<?= urlencode($p); ?>" style="text-decoration:none;">
                    <div class="platform-card">
                        <i class="bi bi-grid fs-3 text-primary"></i>
                        <div><?= htmlspecialchars($p); ?></div>
                    </div>
                </a>
            </div>
        <?php endforeach; ?>
    </div>

</div>
</body>
</html>
