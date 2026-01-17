<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();




require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/functions.php';



// Check pending OTP session
if (!isset($_SESSION['pending_user'])) {
    echo "<script>alert('⚠️ No pending login data found. Please login again.'); window.location.href='login.php';</script>";
    exit;
}

$user = $_SESSION['pending_user'];
$userId = $user['id'] ?? null;

if (!$userId) {
    unset($_SESSION['pending_user']);
    echo "<script>alert('Invalid session data. Please login again.'); window.location.href='login.php';</script>";
    exit;
}

// Fetch fresh OTP from DB
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id LIMIT 1");
$stmt->execute([':id' => $userId]);
$dbUser = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$dbUser) {
    unset($_SESSION['pending_user']);
    echo "<script>alert('User not found. Please login again.'); window.location.href='login.php';</script>";
    exit;
}

$otp_generated = $dbUser['generated_otp_number'] ?? null;
$otp_end_time  = $dbUser['generated_otp_end_time'] ?? 0;
$current_time  = time();

if ($current_time > $otp_end_time) {
    $pdo->prepare("UPDATE users SET generated_otp_number=NULL, generated_otp_time=NULL, generated_otp_end_time=NULL WHERE id=?")->execute([$userId]);
    unset($_SESSION['pending_user']);
    echo "<script>alert('❌ Your OTP has expired. Please login again.'); window.location.href='login.php';</script>";
    exit;
}

// Handle OTP submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entered_otp = sanitize($_POST['otp'] ?? '');

    if ($entered_otp == $otp_generated) {
        unset($_SESSION['pending_user']);

        // ✅ Include all essential info for next page
        $_SESSION['verified_user'] = [
            'id'         => $dbUser['id'],
            'username'   => $dbUser['username'] ?? '',
            'email'      => $dbUser['email'],
            'user_role'  => $dbUser['user_role'] ?? 'user',
            'phone'      => $dbUser['phone'] ?? '',
            'phone_code' => $dbUser['phone_code'] ?? '+880'
        ];

        echo "<script>alert('✅ OTP verified successfully!'); window.location.href='phone_code.php';</script>";
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
body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
.container { max-width: 400px; margin: auto; background: #fff; padding: 25px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
input { width: 100%; padding: 12px; margin-top: 10px; border-radius: 5px; border: 1px solid #ccc; font-size: 16px; text-align:center; letter-spacing:3px; }
button { padding: 10px 15px; background: #25D366; border: none; color: white; cursor: pointer; margin-top: 10px; border-radius: 5px; font-size: 16px; width:100%; }
button:hover { background: #1da851; }
.timer { color: #ff0000; margin-top: 8px; font-weight: bold; }
.copy-btn { margin-left: 10px; padding: 5px 12px; font-size: 14px; border:none; background:#007bff; color:#fff; border-radius:5px; cursor:pointer; }
.copy-btn:hover { background:#0056b3; }
</style>
</head>
<body>
<div class="container">
    <h2>Verify OTP</h2>
    <p>Enter the 6-digit OTP here.</p>
    <form method="POST">
        <input type="text" name="otp" placeholder="Enter OTP" required maxlength="6">
        <button type="submit">Verify & Access Dashboard</button>
    </form>

    <p class="timer" id="timer"></p>

    <p style="margin-top:10px; color:gray;">
        Your OTP for testing:
        <strong id="otpValue"><?php echo htmlspecialchars($otp_generated); ?></strong>
        <button type="button" class="copy-btn" id="copyOtpBtn">Copy OTP</button>
    </p>
</div>

<script>
// Countdown timer
const endTime = <?php echo (int)$otp_end_time; ?>;
function updateTimer() {
    const now = Math.floor(Date.now() / 1000);
    const remaining = endTime - now;
    const timerElem = document.getElementById('timer');
    if (remaining <= 0) {
        timerElem.textContent = "⏰ OTP expired. Please request again.";
    } else {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        timerElem.textContent = `OTP expires in ${minutes}m ${seconds}s`;
        setTimeout(updateTimer, 1000);
    }
}
updateTimer();

// Copy OTP to clipboard
document.getElementById('copyOtpBtn').addEventListener('click', function() {
    const otpText = document.getElementById('otpValue').innerText;
    navigator.clipboard.writeText(otpText)
        .then(() => { alert('✅ OTP copied to clipboard!'); })
        .catch(() => { alert('❌ Failed to copy OTP.'); });
});
</script>
</body>
</html>
