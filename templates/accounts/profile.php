<?php
require_once __DIR__ . '/../config.php';
if (!isset($_SESSION['user_id'])) {
    header('Location: ' . BASE_URL . '/accounts/login');
    exit;
}
$stmt = $pdo->prepare('SELECT email,language,created_at FROM users WHERE id = ? LIMIT 1');
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();
?>
<!doctype html><html><head><meta charset="utf-8"><title>Profile</title></head><body>
<h2>Welcome, <?= htmlspecialchars($user['email']) ?></h2>
<p>Language: <?= htmlspecialchars($user['language']) ?></p>
<p>Member since: <?= htmlspecialchars($user['created_at']) ?></p>
<p><a href="<?= BASE_URL ?>/payments/payeer.php">Deposit (Payeer)</a></p>
<p><a href="<?= BASE_URL ?>/accounts/logout.php">Logout</a></p>
</body></html>
