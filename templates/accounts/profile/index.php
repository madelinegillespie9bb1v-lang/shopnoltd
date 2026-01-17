<?php
session_start();
require_once '../../config.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: ../login/index.php");
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My Profile - Shopnoltd Toolbox</title>
</head>
<body>
<h2>Welcome, <?php echo htmlspecialchars($user['first_name'] . ' ' . $user['last_name']); ?> 👋</h2>

<p><b>Username:</b> <?php echo htmlspecialchars($user['username']); ?></p>
<p><b>Email:</b> <?php echo htmlspecialchars($user['email']); ?></p>
<p><b>Phone:</b> <?php echo htmlspecialchars($user['phone_code'] . ' ' . $user['phone']); ?></p>

<hr>
<a href="../forgot/index.php">Forgot Password</a> |
<a href="../logout.php">Logout</a>
</body>
</html>
