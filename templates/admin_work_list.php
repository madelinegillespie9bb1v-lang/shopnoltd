<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/_common_rates.php';

// ✅ Check login and admin role
$user = $_SESSION['user'] ?? null;
if (!$user || ($user['user_role'] ?? '') !== 'admin') {
    header('Location:/login.php');
    exit;
}

// ✅ Handle approve/reject & fine update (single or bulk)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $fineData = $_POST['fine'] ?? [];
    $workIds = $_POST['work_id'] ?? [];

    if (in_array($action, ['approve', 'reject']) && !empty($workIds)) {
        $status = ($action==='approve') ? 'approved' : 'rejected';
        $stmt = $pdo->prepare("UPDATE job_work SET status=?, fine=? WHERE id=?");
        foreach ($workIds as $id) {
            $id = intval($id);
            $fine = floatval($fineData[$id] ?? 0);
            $stmt->execute([$status, $fine, $id]);
        }
        header("Location: ".$_SERVER['PHP_SELF']);
        exit;
    }
}

// ✅ Fetch all submitted jobs
$stmt = $pdo->query("
    SELECT jw.*, j.title AS job_title, j.per_task_rate, u.username AS worker_username, p.username AS poster_username
    FROM job_work jw
    JOIN jobs j ON jw.job_id = j.id
    JOIN users u ON jw.worker_username = u.username
    JOIN users p ON jw.poster_username = p.username
    ORDER BY jw.submitted_at DESC
");
$works = $stmt->fetchAll(PDO::FETCH_ASSOC);
$works_count = count($works);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Work List</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<style>
.instructions-box { background:#fffbea; border-left:5px solid #f0ad4e; padding:8px 12px; border-radius:6px; }
body { background:#f8f9fa; }
.table thead { background:#0d6efd; color:white; }
input.fine-input { width:70px; }
</style>
</head>
<body>
<div class="container py-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3>🛠 All Submitted Tasks (<?= $works_count ?>)</h3>
        <a href="/admindashboard.php" class="btn btn-secondary">⬅ Back</a>
    </div>

    <?php if ($works_count === 0): ?>
        <div class="alert alert-info">No submitted jobs found.</div>
    <?php else: ?>

    <form method="post" id="bulkForm">
    <div class="mb-2 d-flex align-items-center gap-2">
        <button type="submit" name="action" value="approve" class="btn btn-success btn-sm">✔ Bulk Approve</button>
        <button type="submit" name="action" value="reject" class="btn btn-danger btn-sm">✖ Bulk Reject</button>
        <span class="ms-2 text-muted">Set fine in column before submitting</span>
    </div>

    <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
            <thead>
                <tr>
                    <th><input type="checkbox" id="selectAll"></th>
                    <th>ID</th>
                    <th>Job Title</th>
                    <th>Worker</th>
                    <th>Poster</th>
                    <th>Platform</th>
                    <th>Task Type</th>
                    <th>Before Screenshot</th>
                    <th>After Screenshot</th>
                    <th>Rate ($)</th>
                    <th>Fine ($)</th>
                    <th>Status</th>
                    <th>Submitted At</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($works as $work): ?>
                <tr>
                    <td>
                        <?php if($work['status']=='pending'): ?>
                        <input type="checkbox" name="work_id[]" value="<?= $work['id'] ?>">
                        <?php endif; ?>
                    </td>
                    <td><?= $work['id'] ?></td>
                    <td><?= htmlspecialchars($work['job_title'] ?? '-') ?></td>
                    <td><?= htmlspecialchars($work['worker_username']) ?></td>
                    <td><?= htmlspecialchars($work['poster_username']) ?></td>
                    <td><?= htmlspecialchars($work['platform']) ?></td>
                    <td><?= htmlspecialchars($work['category']) ?></td>
                    <td>
                        <?php if ($work['screenshot_before']): ?>
                            <a href="<?= htmlspecialchars($work['screenshot_before']) ?>" target="_blank">View</a>
                        <?php endif; ?>
                    </td>
                    <td>
                        <?php if ($work['screenshot_after']): ?>
                            <a href="<?= htmlspecialchars($work['screenshot_after']) ?>" target="_blank">View</a>
                        <?php endif; ?>
                    </td>
                    <td><?= number_format($work['per_task_rate'],4) ?></td>
                    <td>
                        <?php if($work['status']=='pending'): ?>
                        <input type="number" step="0.0001" min="0" name="fine[<?= $work['id'] ?>]" value="<?= number_format($work['fine'] ?? 0,4) ?>" class="form-control form-control-sm fine-input">
                        <?php else: ?>
                        <?= number_format($work['fine'] ?? 0,4) ?>
                        <?php endif; ?>
                    </td>
                    <td><?= htmlspecialchars(ucfirst($work['status'])) ?></td>
                    <td><?= htmlspecialchars($work['submitted_at']) ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    </form>

    <?php endif; ?>
</div>

<script>
// ✅ Select / Deselect all pending tasks
document.getElementById('selectAll').addEventListener('change', function() {
    const checked = this.checked;
    document.querySelectorAll('input[name="work_id[]"]').forEach(cb => cb.checked = checked);
});
</script>

</body>
</html>
