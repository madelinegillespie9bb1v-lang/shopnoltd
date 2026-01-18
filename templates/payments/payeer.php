<?php
require_once __DIR__ . '/../config.php';
$config = require __DIR__ . '/config_payments.php';
if (!isset($_SESSION['user_id'])) {
    header('Location: ' . BASE_URL . '/accounts/login');
    exit;
}
$user_id = $_SESSION['user_id'];

// simple example: user posts amount
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $amount = number_format((float)$_POST['amount'], 2, '.', '');
    $order_id = 'ORD' . time() . rand(1000,9999);

    // insert pending payment
    $stmt = $pdo->prepare('INSERT INTO payments (user_id,gateway,amount,currency,status,txn_id) VALUES (?,?,?,?,?,?)');
    $stmt->execute([$user_id,'payeer',$amount,'USD','pending',$order_id]);
    $payment_id = $pdo->lastInsertId();

    // prepare payeer form (signed)
    $m_shop = $config['payeer']['merchant_id'];
    $m_orderid = $order_id;
    $m_amount = $amount;
    $m_curr = 'USD';
    $secret = $config['payeer']['secret_key'];

    $arHash = array($m_shop, $m_orderid, $m_amount, $m_curr, $secret);
    $sign = strtoupper(hash('sha256', implode(':', $arHash)));

    // redirect user to Payeer merchant URL (form auto-submit)
    echo '<form id="pform" method="GET" action="https://payeer.com/merchant/">';
    echo '<input type="hidden" name="m_shop" value="'.htmlspecialchars($m_shop).'">';
    echo '<input type="hidden" name="m_orderid" value="'.htmlspecialchars($m_orderid).'">';
    echo '<input type="hidden" name="m_amount" value="'.htmlspecialchars($m_amount).'">';
    echo '<input type="hidden" name="m_curr" value="'.htmlspecialchars($m_curr).'">';
    echo '<input type="hidden" name="m_sign" value="'.htmlspecialchars($sign).'">';
    echo '</form><script>document.getElementById("pform").submit();</script>';
    exit;
}
?>
<!doctype html><html><head><meta charset="utf-8"><title>Payeer Deposit</title></head><body>
<h2>Payeer Deposit</h2>
<form method="post" action="">
  <label>Amount (USD): <input name="amount" value="1.00" required></label>
  <button type="submit">Pay with Payeer</button>
</form>
</body></html>
