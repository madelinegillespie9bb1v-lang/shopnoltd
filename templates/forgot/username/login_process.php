<?php
session_start();
require_once __DIR__ . '/../../../../config.php';

// Debug mode for now
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ✅ Check pending session
if (!isset($_SESSION['pending_user'])) {
    echo "<script>alert('No OTP session found. Please request a new OTP.');window.location.href='index.php';</script>";
    exit;
}

$user = $_SESSION['pending_user'];
$otp_generated = $user['otp'];
$otp_time = $user['otp_time'];
$expiry_limit = 10 * 60; // 10 minutes
$time_elapsed = time() - $otp_time;

// ✅ OTP Expired?
if ($time_elapsed > $expiry_limit) {
    unset($_SESSION['pending_user']);
    echo "<script>alert('❌ OTP expired! Please try again.');window.location.href='index.php';</script>";
    exit;
}

// ✅ On OTP submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entered_otp = trim($_POST['otp'] ?? '');

    if ($entered_otp == $otp_generated) {
        // ✅ OTP verified successfully
        $_SESSION['verified_user'] = [
            'id'       => $user['id'],
            'username' => $user['username'],
            'email'    => $user['email']
        ];

        unset($_SESSION['pending_user']);

        echo "<script>alert('✅ OTP verified successfully!');window.location.href='username.php';</script>";
        exit;
    } else {
        echo "<script>alert('❌ Invalid OTP! Please try again.');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify OTP - Shopnoltd Toolbox</title>
<style>
body { font-family: Arial; background: #f5f5f5; padding: 20px; }
.container { max-width: 400px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
input { width: 100%; padding: 10px; margin-top: 10px; border-radius: 5px; border: 1px solid #ccc; }
button { padding: 10px 15px; background: #25D366; border: none; color: white; cursor: pointer; margin-top: 10px; border-radius: 5px; }
</style>
</head>
<body>
<div class="container">
    <h2>Verify OTP</h2>
    <p>Enter the 6-digit OTP shown in your browser.</p>

    <form method="POST">
        <input type="text" name="otp" placeholder="Enter OTP" required maxlength="6">
        <button type="submit">Verify</button>
    </form>

    <p style="margin-top:10px; color:gray;">
        (Your OTP is: 
        <strong id="otpValue"><?php echo htmlspecialchars($otp_generated); ?></strong>
        <button type="button" id="copyOtpBtn"
            style="margin-left:5px; padding:3px 8px; font-size:12px; border:none; background:#007bff; color:#fff; border-radius:4px; cursor:pointer;">
            Copy
        </button>)
    </p>

    <script>
    document.getElementById('copyOtpBtn').addEventListener('click', function() {
        const otpText = document.getElementById('otpValue').innerText;
        navigator.clipboard.writeText(otpText).then(() => {
            alert('✅ OTP copied!');
        }).catch(() => {
            alert('❌ Failed to copy OTP.');
        });
    });
    </script>
</div>
</body>
</html>
