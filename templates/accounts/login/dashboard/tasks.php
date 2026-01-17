<?php
session_start();
require_once __DIR__ . '/../../config.php';
// config.php must define $pdo and BASE_URL
?>

<?php
if (!isset($_SESSION['user'])) { header('Location: ../../accounts/login/index.php'); exit; }
$user = $_SESSION['user'];
$stmt = $pdo->prepare("SELECT * FROM tasks WHERE user_id = :uid ORDER BY created_at DESC");
$stmt->execute([':uid'=>$user['id']]);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html><html><head><meta charset="utf-8"><title>My Job Posts</title></head><body>
<h2>My Job Posts (view only)</h2>
<table border="1" cellpadding="6"><tr><th>ID</th><th>Title</th><th>Type</th><th>Pay</th><th>Qty</th><th>Remaining</th><th>Status</th></tr>
<?php foreach($tasks as $t): ?>
<tr>
<td><?php echo $t['id']; ?></td>
<td><?php echo htmlspecialchars($t['title']); ?></td>
<td><?php echo htmlspecialchars($t['task_type']); ?></td>
<td>$<?php echo number_format($t['pay_rate'],5); ?></td>
<td><?php echo $t['quantity']; ?></td>
<td><?php echo $t['remaining']; ?></td>
<td><?php echo $t['status']; ?></td>
</tr>
<?php endforeach; ?>
</table>
<p><a href="dashboard.php">Back</a></p>
</body></html>
