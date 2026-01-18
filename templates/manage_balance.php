<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';

// Admin check
$admin = $_SESSION['user'] ?? null;
if (!$admin || ($admin['user_role'] ?? '') !== 'admin') {
    header('Location: /login.php');
    exit;
}

// Ensure balance columns exist
$pdo->exec("ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `balance` DECIMAL(12,2) NOT NULL DEFAULT 0");
$pdo->exec("ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `balance_pending` DECIMAL(12,2) NOT NULL DEFAULT 0");
$pdo->exec("ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `balance_frozen` DECIMAL(12,2) NOT NULL DEFAULT 0");
$pdo->exec("ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `balance_fine` DECIMAL(12,2) NOT NULL DEFAULT 0");

// Ensure transactions table exists
$pdo->exec("
CREATE TABLE IF NOT EXISTS `user_transactions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `type` ENUM('deposit','withdraw','exchange','fine') NOT NULL,
    `amount` DECIMAL(12,2) NOT NULL,
    `currency` VARCHAR(10) DEFAULT 'USD',
    `gateway` VARCHAR(50) DEFAULT NULL,
    `status` ENUM('pending','completed','failed') DEFAULT 'pending',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
");

// --- Handle Add Funds ---
if (isset($_POST['fund_submit'])) {
    $amount = floatval($_POST['amount']);
    $currency = $_POST['currency'];
    $gateway = $_POST['gateway'];

    if ($amount > 0) {
        $stmt = $pdo->prepare("INSERT INTO user_transactions (user_id, type, amount, currency, gateway, status) VALUES (?, 'deposit', ?, ?, ?, 'pending')");
        $stmt->execute([$admin['id'], $amount, $currency, $gateway]);
        $_SESSION['flash_success'] = "Fund request of $amount $currency submitted via $gateway.";
    } else {
        $_SESSION['flash_error'] = "Invalid amount.";
    }
    header("Location: manage_balance.php");
    exit;
}

// --- Handle Exchange ---
if (isset($_POST['exchange_submit'])) {
    $amount = floatval($_POST['ex_amount']);
    $from = $_POST['ex_from'];
    $to = $_POST['ex_to'];

    $rates = ['USD'=>1,'BTC'=>50000,'USDT'=>1]; // Example rates
    $converted = $amount * ($rates[$to]/$rates[$from]);

    if ($amount>0 && $from!==$to) {
        $stmt = $pdo->prepare("INSERT INTO user_transactions (user_id,type,amount,currency,gateway,status) VALUES (?, 'exchange', ?, ?, 'exchange','completed')");
        $stmt->execute([$admin['id'],$converted,$to]);
        $_SESSION['flash_success'] = "Exchanged $amount $from → ".number_format($converted,2)." $to";
    } else {
        $_SESSION['flash_error'] = "Invalid exchange.";
    }
    header("Location: manage_balance.php");
    exit;
}

// --- Fetch users ---
$search = $_GET['search'] ?? '';
if ($search) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username LIKE ? OR email LIKE ? OR id=? ORDER BY id DESC");
    $stmt->execute(["%$search%", "%$search%", $search]);
} else {
    $stmt = $pdo->query("SELECT * FROM users ORDER BY id DESC");
}
$users = $stmt->fetchAll();

// Admin balance
$adminBalanceStmt = $pdo->prepare("SELECT balance FROM users WHERE id=? LIMIT 1");
$adminBalanceStmt->execute([$admin['id']]);
$adminBalance = $adminBalanceStmt->fetchColumn() ?? 0;

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Manage Balances</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
<style>
body{background:#f8f9fa;}
.card-stat{text-align:center;border-radius:12px;box-shadow:0 0 6px rgba(0,0,0,0.08);}
.table th{background:#0d6efd;color:#fff;}
.action-icons i{font-size:1.2rem; cursor:pointer;margin:0 6px;}
.action-icons i:hover{transform:scale(1.2);transition:0.2s;}
</style>
</head>
<body>
<div class="container py-4">
<h2 class="mb-4">💰 Manage Balances</h2>

<?php if($_SESSION['flash_success']): ?><div class="alert alert-success"><?= $_SESSION['flash_success'] ?></div><?php endif; ?>
<?php if($_SESSION['flash_error']): ?><div class="alert alert-danger"><?= $_SESSION['flash_error'] ?></div><?php endif; ?>
<?php unset($_SESSION['flash_success'],$_SESSION['flash_error']); ?>

<div class="row mb-4 text-center">
    <div class="col-md-4"><div class="card card-stat p-3 bg-primary text-white"><h5>Total Users</h5><h3><?= count($users) ?></h3></div></div>
    <div class="col-md-4"><div class="card card-stat p-3 bg-success text-white"><h5>Total Balance (All Users)</h5><h3>$<?= number_format(array_sum(array_column($users,'balance')),2) ?></h3></div></div>
    <div class="col-md-4"><div class="card card-stat p-3 bg-warning text-dark"><h5>Your Admin Balance</h5><h3>$<?= number_format($adminBalance,2) ?></h3></div></div>
</div>

<!-- Add Funds Form -->
<div class="card mb-4 p-3">
<h5>Add Funds / Exchange</h5>
<form method="post">
<div class="row g-3 align-items-center">
    <div class="col-md-2"><input type="number" step="0.01" min="0" name="amount" class="form-control" placeholder="Amount" required></div>
    <div class="col-md-2"><select name="currency" class="form-select"><option value="USD">USD</option><option value="BTC">BTC</option><option value="USDT">USDT</option></select></div>
    <div class="col-md-2"><select name="gateway" class="form-select"><option value="payeer">Payeer</option><option value="binance">Binance</option><option value="manual">Manual</option></select></div>
    <div class="col-md-2"><button type="submit" name="fund_submit" class="btn btn-success w-100"><i class="bi bi-plus-circle"></i> Add Funds</button></div>
</div>
</form>
</div>

<!-- Exchange Form -->
<div class="card mb-4 p-3">
<form method="post">
<div class="row g-3 align-items-center">
    <div class="col-md-2"><input type="number" step="0.01" min="0" name="ex_amount" class="form-control" placeholder="Amount" required></div>
    <div class="col-md-2"><select name="ex_from" class="form-select"><option value="USD">USD</option><option value="BTC">BTC</option><option value="USDT">USDT</option></select></div>
    <div class="col-md-2"><select name="ex_to" class="form-select"><option value="USD">USD</option><option value="BTC">BTC</option><option value="USDT">USDT</option></select></div>
    <div class="col-md-2"><button type="submit" name="exchange_submit" class="btn btn-primary w-100"><i class="bi bi-arrow-left-right"></i> Exchange</button></div>
</div>
</form>
</div>

<!-- Users Table -->
<div class="table-responsive">
<table class="table table-bordered table-striped align-middle text-center">
<thead>
<tr><th>ID</th><th>Username</th><th>Email</th><th>Balance ($)</th><th>Actions</th></tr>
</thead>
<tbody>
<?php foreach($users as $u): ?>
<tr>
<td><?= $u['id'] ?></td>
<td><?= htmlspecialchars($u['username']) ?></td>
<td><?= htmlspecialchars($u['email']) ?></td>
<td>$<?= number_format($u['balance'],2) ?></td>
<td class="action-icons">
<a href="edit_user.php?id=<?= $u['id'] ?>"><i class="bi bi-pencil-square text-primary"></i></a>
<a href="freeze_user.php?id=<?= $u['id'] ?>"><i class="bi bi-snow text-warning"></i></a>
</td>
</tr>
<?php endforeach; ?>
</tbody>
</table>
</div>
</div>
</body>
</html>
