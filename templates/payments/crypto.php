<?php
require_once __DIR__ . '/../config.php';
if (!isset($_SESSION['user_id'])) {
    header('Location: ' . BASE_URL . '/accounts/login');
    exit;
}
?>
<!doctype html><html><head><meta charset="utf-8"><title>Crypto (Placeholder)</title></head><body>
<h2>Crypto deposit placeholder</h2>
<p>Implement TRC20/USDT deposit flow: create an invoice, show wallet address/QR, monitor on-chain tx and then credit user balance.</p>
</body></html>
