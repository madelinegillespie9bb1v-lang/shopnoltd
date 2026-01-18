<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';

// Admin check
$admin = $_SESSION['user'] ?? null;
if (!$admin || ($admin['user_role'] ?? '') !== 'admin') {
    header('Location: /login.php');
    exit;
}

// 🧩 Fetch user summary counts
$totalUsers = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$activeUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE status='active'")->fetchColumn();
$frozenUsers = $pdo->query("SELECT COUNT(*) FROM users WHERE status='frozen'")->fetchColumn();
$pendingBalance = $pdo->query("SELECT SUM(balance_pending) FROM users")->fetchColumn() ?? 0;

// 🧩 Search filter
$search = $_GET['search'] ?? '';
if ($search) {
    $stmt = $pdo->prepare("
        SELECT * FROM users 
        WHERE username LIKE ? OR email LIKE ? OR phone LIKE ?
        ORDER BY id DESC
    ");
    $stmt->execute(["%$search%", "%$search%", "%$search%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM users ORDER BY id DESC");
}
$users = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>👥 Manage Users</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<style>
body { background: #f8f9fa; }
.card-stat { text-align: center; border-radius: 15px; box-shadow: 0 0 6px rgba(0,0,0,0.1); }
.table th { background: #0d6efd; color: white; }
.action-icons i { font-size: 1.2rem; cursor: pointer; margin: 0 6px; }
.action-icons i:hover { transform: scale(1.2); transition: 0.2s; }
.search-bar input { width: 300px; border-radius: 10px; }
</style>
</head>
<body>
<div class="container py-4">
  <h2 class="mb-4"><i class="bi bi-people-fill"></i> Manage Users</h2>

  <!-- Dashboard Stats -->
  <div class="row mb-4 text-center">
    <div class="col-md-3 mb-3">
      <div class="card card-stat p-3">
        <h5>Total Users</h5>
        <h3><?php echo $totalUsers; ?></h3>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card card-stat p-3 bg-success text-white">
        <h5>Active Users</h5>
        <h3><?php echo $activeUsers; ?></h3>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card card-stat p-3 bg-warning">
        <h5>Deactivated Users</h5>
        <h3><?php echo $frozenUsers; ?></h3>
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <div class="card card-stat p-3 bg-info text-white">
        <h5>Total Pending Balance ($)</h5>
        <h3>$<?php echo number_format($pendingBalance, 2); ?></h3>
      </div>
    </div>
  </div>

  <!-- Search -->
  <form class="search-bar mb-3" method="get">
    <input type="text" name="search" placeholder="Search by username, email, or phone..." 
           value="<?php echo htmlspecialchars($search); ?>" class="form-control d-inline-block">
    <button class="btn btn-primary ms-2"><i class="bi bi-search"></i> Search</button>
  </form>

  <!-- Users Table -->
  <div class="table-responsive">
    <table class="table table-bordered table-striped align-middle text-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Country Name</th>
          <th>Role</th>
          <th>Total Balance ($)</th>
          <th>Pending Balance ($)</th>
          <th>Frozen Balance ($)</th>
          <th>Fine Balance ($)</th>
          <th>Status</th>
          <th>Joined</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($users): ?>
          <?php foreach ($users as $u): ?>
            <tr>
              <td><?php echo $u['id']; ?></td>
              <td><?php echo htmlspecialchars($u['username']); ?></td>
              <td><?php echo htmlspecialchars($u['email']); ?></td>
              <td><?php echo htmlspecialchars($u['phone']); ?></td>
              <td><?php echo htmlspecialchars($u['phone_country'] ?? '-'); ?></td>
              <td><?php echo ucfirst($u['user_role']); ?></td>
              <td>$<?php echo number_format($u['balance'], 2); ?></td>
              <td>$<?php echo number_format($u['balance_pending'] ?? 0, 2); ?></td>
              <td>$<?php echo number_format($u['balance_frozen'] ?? 0, 2); ?></td>
              <td>$<?php echo number_format($u['balance_fine'] ?? 0, 2); ?></td>
              <td>
                <?php if ($u['status'] === 'active'): ?>
                  <span class="badge bg-success">Active</span>
                <?php elseif ($u['status'] === 'deactivated'): ?>
                  <span class="badge bg-warning text-dark">Deactivated</span>
                <?php elseif ($u['status'] === 'frozen'): ?>
                  <span class="badge bg-secondary">Frozen</span>
                <?php else: ?>
                  <span class="badge bg-light text-dark"><?php echo ucfirst($u['status']); ?></span>
                <?php endif; ?>
              </td>
              <td><?php echo $u['created_at']; ?></td>
              <td class="action-icons">
                <a href="edit_user.php?id=<?php echo $u['id']; ?>" title="Edit"><i class="bi bi-pencil-square text-primary"></i></a>
                <a href="freeze_user.php?id=<?php echo $u['id']; ?>" title="Freeze/Unfreeze"><i class="bi bi-snow text-warning"></i></a>
                <a href="delete_user.php?id=<?php echo $u['id']; ?>" title="Delete" onclick="return confirm('Delete this user?')"><i class="bi bi-trash text-danger"></i></a>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php else: ?>
          <tr><td colspan="13">No users found in database.</td></tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>
