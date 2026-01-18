<?php
// Payeer callback endpoint
require_once __DIR__ . '/../../config.php';
$config = require __DIR__ . '/../config_payments.php';
$secret = $config['payeer']['secret_key'];

// Payeer sends POST with m_operation_id,m_sign,m_state,m_amount,m_curr,m_orderid
$raw = $_POST;
if (empty($raw)) {
    http_response_code(400);
    echo 'No POST data';
    exit;
}

$m_shop = $_POST['m_shop'] ?? '';
$m_orderid = $_POST['m_orderid'] ?? '';
$m_amount = $_POST['m_amount'] ?? '';
$m_curr = $_POST['m_curr'] ?? '';
$m_state = $_POST['m_state'] ?? '';
$m_sign = $_POST['m_sign'] ?? '';

$sign_hash = strtoupper(hash('sha256', implode(':', [$m_shop,$m_orderid,$m_amount,$m_curr,$m_state,$secret])));

// simple verification
if ($m_sign !== $sign_hash) {
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

// find payment by txn_id (we stored order id)
$stmt = $pdo->prepare('UPDATE payments SET status = ? WHERE txn_id = ? LIMIT 1');
if ($m_state === 'success' || $m_state === 'ok') {
    $stmt->execute(['paid',$m_orderid]);
    echo 'OK';
} else {
    $stmt->execute(['failed',$m_orderid]);
    echo 'FAIL';
}
