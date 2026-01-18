<?php
require_once __DIR__ . '/../../config.php';
// demo: mark as paid when visited with demo_order
$demo = $_GET['demo_order'] ?? null;
if ($demo) {
    $stmt = $pdo->prepare('UPDATE payments SET status = ? WHERE txn_id = ? LIMIT 1');
    $stmt->execute(['paid',$demo]);
    echo 'Demo Binance payment marked as paid for order: ' . htmlspecialchars($demo);
    exit;
}
echo 'No demo_order provided.';
