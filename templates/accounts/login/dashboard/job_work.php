<?php
session_start();
require_once __DIR__ . '/../../config.php';
// config.php must define $pdo and BASE_URL
?>

<?php
if (!isset($_SESSION['user'])) { header('Location: ../../accounts/login/index.php'); exit; }
$user = $_SESSION['user'];
// Get approved tasks with remaining > 0 and not already done by this user for same task type (enforce one per type)
$sql = "SELECT t.* FROM tasks t WHERE t.status='approved' AND t.remaining>0";
$stmt = $pdo->query($sql);
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

// handle submission of a job work
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_id = (int)($_POST['task_id'] ?? 0);
    $proof = trim($_POST['proof'] ?? '');
    // check if user already did this task type before
    $check = $pdo->prepare("SELECT COUNT(*) FROM job_work jw JOIN tasks t ON jw.task_id=t.id WHERE jw.worker_id=:uid AND t.task_type=(SELECT task_type FROM tasks WHERE id=:tid)");
    $check->execute([':uid'=>$user['id'], ':tid'=>$task_id]);
    if ($check->fetchColumn() > 0) {
        $err = 'You already did this task type once.';
    } else {
        $ins = $pdo->prepare("INSERT INTO job_work (task_id, worker_id, proof, status, created_at) VALUES (:tid, :wid, :proof, 'pending', NOW())");
        $ins->execute([':tid'=>$task_id, ':wid'=>$user['id'], ':proof'=>$proof]);
        header('Location: job_work_list.php');
        exit;
    }
}
?>
<!doctype html><html><head><meta charset="utf-8"><title>Do Job</title></head><body>
<h2>Available Tasks (approved)</h2>
<?php if(!empty($err)) echo '<p style="color:red">'.htmlspecialchars($err).'</p>'; ?>
<table border="1" cellpadding="6"><tr><th>ID</th><th>Title</th><th>Pay</th><th>Remaining</th><th>Action</th></tr>
<?php foreach($tasks as $t): ?>
<tr>
<td><?php echo $t['id'];?></td>
<td><?php echo htmlspecialchars($t['title']);?></td>
<td>$<?php echo number_format($t['pay_rate'],5);?></td>
<td><?php echo $t['remaining'];?></td>
<td>
<form method="post" style="display:inline">
<input type="hidden" name="task_id" value="<?php echo $t['id'];?>">
<input name="proof" placeholder="Paste proof link or text" required>
<button type="submit">Start / Submit</button>
</form>
</td>
</tr>
<?php endforeach; ?>
</table>
<p><a href="dashboard.php">Back</a></p>
</body></html>
