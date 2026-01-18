<?php 
// fund_approval.php — Admin panel for approving/rejecting fund requests
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';

// ✅ Accept both verified_user (from OTP login) and user (from legacy login)
$adminSession = $_SESSION['verified_user'] ?? $_SESSION['user'] ?? null;
if (!$adminSession || ($adminSession['user_role'] ?? '') !== 'admin') {
    echo "<script>alert('Access denied. Admin only.'); window.location.href='/login.php';</script>";
    exit;
}

// ✅ Ensure PDO instance
try {
    if (!isset($pdo) || !$pdo instanceof PDO) {
        $pdo = new PDO(
            "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4",
            $db_user,
            $db_pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo "<h2>Database connection failed</h2><pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
    exit;
}

// --- Helper functions ---
function tableExists(PDO $pdo, string $name): bool {
    $stmt = $pdo->prepare("SHOW TABLES LIKE ?");
    $stmt->execute([$name]);
    return (bool)$stmt->fetchColumn();
}
function columnExists(PDO $pdo, string $table, string $col): bool {
    $stmt = $pdo->prepare("SHOW COLUMNS FROM `$table` LIKE ?");
    $stmt->execute([$col]);
    return (bool)$stmt->fetchColumn();
}

// ✅ Ensure the `fund_requests` table exists
$table = 'fund_requests';
if (!tableExists($pdo, $table)) {
    echo "<h2>❌ Missing table: `$table`</h2><p>Please create it or update the script.</p>";
    exit;
}

// --- Handle approve/reject ---
$action  = $_GET['action'] ?? null;
$id      = isset($_GET['id']) ? intval($_GET['id']) : 0;
$adminId = $adminSession['id'] ?? null;

if ($action && $id > 0) {
    if (!in_array($action, ['approve', 'reject'], true)) {
        header("Location: fund_approval.php");
        exit;
    }

    // Fetch request
    $check = $pdo->prepare("SELECT * FROM {$table} WHERE id=? LIMIT 1");
    $check->execute([$id]);
    $req = $check->fetch();

    if (!$req) {
        $_SESSION['flash_error'] = "Request #{$id} not found.";
        header("Location: fund_approval.php"); exit;
    }

    if ($req['status'] !== 'pending') {
        $_SESSION['flash_error'] = "Request #{$id} already {$req['status']}.";
        header("Location: fund_approval.php"); exit;
    }

    $newStatus = $action === 'approve' ? 'approved' : 'rejected';
    $hasProcessedBy = columnExists($pdo, $table, 'processed_by');

    try {
        if ($hasProcessedBy) {
            $sql = "UPDATE {$table}
                    SET status=?, processed_at=NOW(), processed_by=?
                    WHERE id=? AND status='pending'";
            $pdo->prepare($sql)->execute([$newStatus, $adminId, $id]);
        } else {
            $sql = "UPDATE {$table}
                    SET status=?, processed_at=NOW()
                    WHERE id=? AND status='pending'";
            $pdo->prepare($sql)->execute([$newStatus, $id]);
        }

        // ✅ Optional: auto-credit user on approval
        /*
        if ($newStatus === 'approved') {
            $pdo->prepare("UPDATE users SET balance = balance + ? WHERE id = ?")
                ->execute([$req['amount'], $req['user_id']]);
        }
        */

        $_SESSION['flash_success'] = "Request #{$id} {$newStatus} successfully.";
    } catch (Throwable $e) {
        $_SESSION['flash_error'] = "Database update failed: " . $e->getMessage();
    }

    header("Location: fund_approval.php");
    exit;
}

// --- Stats ---
$counts = [
    'total'    => 0,
    'pending'  => 0,
    'approved' => 0,
    'rejected' => 0
];
foreach ($counts as $key => &$val) {
    try {
        $where = $key === 'total' ? '' : "WHERE status='{$key}'";
        $val = (int)$pdo->query("SELECT COUNT(*) FROM {$table} {$where}")->fetchColumn();
    } catch (Throwable $e) { $val = 0; }
}

// --- Fetch requests ---
$search = trim($_GET['search'] ?? '');
if ($search !== '') {
    $isNum = ctype_digit($search);
    $sql = "
        SELECT fr.*, u.username, u.email
        FROM {$table} fr
        LEFT JOIN users u ON fr.user_id = u.id
        WHERE u.username LIKE :q OR u.email LIKE :q " . ($isNum ? "OR fr.id = :id " : "") . "
        ORDER BY fr.id DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':q', "%{$search}%");
    if ($isNum) $stmt->bindValue(':id', (int)$search, PDO::PARAM_INT);
    $stmt->execute();
    $requests = $stmt->fetchAll();
} else {
    $requests = $pdo->query("
        SELECT fr.*, u.username, u.email
        FROM {$table} fr
        LEFT JOIN users u ON fr.user_id = u.id
        ORDER BY fr.id DESC
    ")->fetchAll();
}

// --- Flash messages ---
$flashSuccess = $_SESSION['flash_success'] ?? null;
$flashError   = $_SESSION['flash_error'] ?? null;
unset($_SESSION['flash_success'], $_SESSION['flash_error']);
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Fund Approval - Admin</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<style>
body { background:#f8f9fa; }
.card-stat { text-align:center; border-radius:12px; box-shadow:0 0 6px rgba(0,0,0,0.08); }
.table th { background:#0d6efd; color:#fff; }
.search-bar input { width:320px; border-radius:10px; }
.action-icons a { margin:0 6px; font-size:1.15rem; }
</style>
</head>
<body>
<div class="container py-4">
  <h2 class="mb-4"><i class="bi bi-file-earmark-check"></i> Fund Approval</h2>

  <!-- ✅ Back to Dashboard Button -->
  <div class="mb-3">
    <a href="/admindashboard.php" class="btn btn-secondary">
      <i class="bi bi-arrow-left-circle"></i> Back to Dashboard
    </a>
  </div>

  <?php if ($flashSuccess): ?>
    <div class="alert alert-success"><?php echo htmlspecialchars($flashSuccess); ?></div>
  <?php endif; ?>
  <?php if ($flashError): ?>
    <div class="alert alert-danger"><?php echo htmlspecialchars($flashError); ?></div>
  <?php endif; ?>

  <div class="row mb-4 text-center">
    <div class="col-md-3 mb-3"><div class="card card-stat p-3 bg-primary text-white"><h6>Total Requests</h6><h3><?=number_format($counts['total'])?></h3></div></div>
    <div class="col-md-3 mb-3"><div class="card card-stat p-3 bg-warning text-dark"><h6>Pending</h6><h3><?=number_format($counts['pending'])?></h3></div></div>
    <div class="col-md-3 mb-3"><div class="card card-stat p-3 bg-success text-white"><h6>Approved</h6><h3><?=number_format($counts['approved'])?></h3></div></div>
    <div class="col-md-3 mb-3"><div class="card card-stat p-3 bg-danger text-white"><h6>Rejected</h6><h3><?=number_format($counts['rejected'])?></h3></div></div>
  </div>

  <form class="search-bar mb-3 d-flex" method="get">
    <input type="text" name="search" class="form-control d-inline-block" placeholder="Search username, email, or ID..." value="<?=htmlspecialchars($search)?>">
    <button class="btn btn-primary ms-2"><i class="bi bi-search"></i> Search</button>
  </form>

  <div class="table-responsive">
    <table class="table table-bordered table-striped align-middle text-center">
      <thead>
        <tr>
          <th>ID</th><th>User</th><th>Email</th><th>Amount ($)</th><th>Requested At</th>
          <th>Status</th><th>Processed At</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($requests): foreach ($requests as $r): ?>
          <tr>
            <td><?=$r['id']?></td>
            <td><?=htmlspecialchars($r['username'] ?? '—')?></td>
            <td><?=htmlspecialchars($r['email'] ?? '—')?></td>
            <td>$<?=number_format($r['amount'] ?? 0, 2)?></td>
            <td><?=htmlspecialchars($r['requested_at'] ?? '-')?></td>
            <td>
              <?php
                $st = $r['status'] ?? '';
                echo match($st) {
                  'pending'  => '<span class="badge bg-warning text-dark">Pending</span>',
                  'approved' => '<span class="badge bg-success">Approved</span>',
                  'rejected' => '<span class="badge bg-danger">Rejected</span>',
                  default    => '<span class="badge bg-secondary">'.htmlspecialchars($st).'</span>'
                };
              ?>
            </td>
            <td><?=htmlspecialchars($r['processed_at'] ?? '-')?></td>
            <td class="action-icons">
              <?php if (($r['status'] ?? '') === 'pending'): ?>
                <a href="?action=approve&id=<?=$r['id']?>" title="Approve" onclick="return confirm('Approve this fund request?')"><i class="bi bi-check-circle text-success"></i></a>
                <a href="?action=reject&id=<?=$r['id']?>" title="Reject" onclick="return confirm('Reject this fund request?')"><i class="bi bi-x-circle text-danger"></i></a>
              <?php else: ?>&mdash;<?php endif; ?>
            </td>
          </tr>
        <?php endforeach; else: ?>
          <tr><td colspan="8">No fund requests found.</td></tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>
