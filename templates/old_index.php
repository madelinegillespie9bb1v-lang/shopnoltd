<?php
session_start();
require_once __DIR__ . '/../../config.php';
// config.php must define $pdo and BASE_URL
?>

<?php
if (!isset($_SESSION['user']) || $_SESSION['user']['user_role']!=='admin') { header('Location: index.php'); exit; }
// basic stats
$stmt = $pdo->query("SELECT COUNT(*) as users FROM users");
$users = $stmt->fetch(PDO::FETCH_ASSOC)['users'];
$stmt = $pdo->query("SELECT COUNT(*) as tasks FROM tasks");
$tasks = $stmt->fetch(PDO::FETCH_ASSOC)['tasks'];
$stmt = $pdo->query("SELECT COUNT(*) as works FROM job_work");
$works = $stmt->fetch(PDO::FETCH_ASSOC)['works'];
?>
<!doctype html><html><head><meta charset="utf-8"><title>Admin Dashboard</title></head><body>
<h1>Admin Dashboard</h1>
<p>Users: <?php echo $users;?> | Tasks: <?php echo $tasks;?> | Works: <?php echo $works;?></p>
<ul>
<li><a href="manage_users.php">Manage Users</a></li>
<li><a href="manage_tasks.php">Manage Tasks</a></li>
<li><a href="manage_balance.php">Manage Balance</a></li>
<li><a href="settings.php">Settings (Rates)</a></li>
</ul>
</body></html>
