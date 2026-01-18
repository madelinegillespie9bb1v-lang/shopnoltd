<?php
// ===============================
// ✅ admin/index.php (Bootstrap 5, safe, 500-error-proof)
// ===============================
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// Correct path to config.php
require_once __DIR__ . '/../../../config.php';

// Admin role check
if (!isset($_SESSION['user']) || $_SESSION['user']['user_role'] !== 'admin') {
    header('Location: index.php');
    exit;
}

// Initialize stats
$stats = [
    'users' => 0,
    'tasks' => 0,
    'works' => 0
];

// Fetch stats safely with null checks
try {
    $stmt = $pdo->query("SELECT COUNT(*) as users FROM users");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats['users'] = $row['users'] ?? 0;

    $stmt = $pdo->query("SELECT COUNT(*) as tasks FROM tasks");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats['tasks'] = $row['tasks'] ?? 0;

    $stmt = $pdo->query("SELECT COUNT(*) as works FROM job_work");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats['works'] = $row['works'] ?? 0;
} catch (Exception $e) {
    $stats['users'] = $stats['tasks'] = $stats['works'] = 0;
}

// Fetch recent tasks safely
$recent_tasks = [];
try {
    $stmt = $pdo->query("SELECT id, title, user_id, status, created_at FROM tasks ORDER BY created_at DESC LIMIT 5");
    $recent_tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (Exception $e) {}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard - Shopnoltd Toolbox</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
body { background-color: #f8f9fa; }
.sidebar { height: 100vh; background: #0d6efd; color: #fff; position: fixed; width: 240px; padding-top: 20px; }
.sidebar a { color: #fff; text-decoration: none; display: block; padding: 10px 20px; border-radius: 5px; }
.sidebar a:hover, .sidebar a.active { background: rgba(255,255,255,0.2); }
.content { margin-left: 260px; padding: 20px; }
.card { border: none; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
</style>
</head>
<body>
<div class="d-flex">
  <!-- Sidebar -->
  <div class="sidebar">
    <h4 class="text-center mb-4">Admin Panel</h4>
    <a href="#" class="active">🏠 Dashboard</a>
    <a href="manage_users.php">👥 Manage Users</a>
    <a href="manage_tasks.php">📋 Manage Tasks</a>
    <a href="manage_balance.php">💰 Manage Balance</a>
    <a href="settings.php">⚙️ Settings</a>
    <a href="../../logout.php" style="color:#ffc107;">🚪 Logout</a>
  </div>

  <!-- Main content -->
  <div class="content flex-fill">
    <div class="container-fluid">
      <h2 class="mb-4">Welcome, <?= htmlspecialchars($_SESSION['user']['username']); ?> 👑</h2>

      <!-- Admin Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="card text-center p-3">
            <h6>Total Users</h6>
            <h3><?= $stats['users']; ?></h3>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center p-3">
            <h6>Total Tasks</h6>
            <h3><?= $stats['tasks']; ?></h3>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card text-center p-3">
            <h6>Total Job Works</h6>
            <h3><?= $stats['works']; ?></h3>
          </div>
        </div>
      </div>

      <!-- Recent Tasks Table -->
      <div class="card p-3 mb-4">
        <h5 class="mb-3">📋 Recent Tasks</h5>
        <?php if (!empty($recent_tasks)): ?>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>User ID</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($recent_tasks as $t): ?>
              <tr>
                <td><?= $t['id']; ?></td>
                <td><?= htmlspecialchars($t['title']); ?></td>
                <td><?= $t['user_id']; ?></td>
                <td><?= htmlspecialchars($t['status']); ?></td>
                <td><?= htmlspecialchars($t['created_at']); ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
        <?php else: ?>
          <p class="text-muted mb-0">No recent tasks found.</p>
        <?php endif; ?>
      </div>

      <!-- Charts -->
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <div class="card p-3">
            <h6 class="mb-3">Tasks Distribution</h6>
            <canvas id="tasksChart"></canvas>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card p-3">
            <h6 class="mb-3">User vs Tasks Ratio</h6>
            <canvas id="userTaskChart"></canvas>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
const tasksChart = new Chart(document.getElementById('tasksChart'), {
    type: 'doughnut',
    data: {
        labels: ['Total Tasks', 'Total Works'],
        datasets: [{
            data: [<?= $stats['tasks']; ?>, <?= $stats['works']; ?>],
            backgroundColor: ['#0d6efd','#198754']
        }]
    }
});

const userTaskChart = new Chart(document.getElementById('userTaskChart'), {
    type: 'bar',
    data: {
        labels: ['Users', 'Tasks'],
        datasets: [{
            label: 'Count',
            data: [<?= $stats['users']; ?>, <?= $stats['tasks']; ?>],
            backgroundColor: ['#ffc107','#0d6efd']
        }]
    },
    options: { scales: { y: { beginAtZero: true } } }
});
</script>
</body>
</html>
