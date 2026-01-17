<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

/* ----------------------------------------
   CONFIG & FUNCTIONS
-----------------------------------------*/
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/functions.php';

/* ----------------------------------------
   VERIFY PENDING USER SESSION
-----------------------------------------*/
if (!isset($_SESSION['pending_user'])) {
    echo "<script>
        alert('⚠️ No pending registration found. Please register first.');
        window.location.href='index.php';
    </script>";
    exit;
}

$user = $_SESSION['pending_user'];
$otp_generated = $user['generated_otp_number'] ?? null;
$otp_end_time  = $user['generated_otp_end_time'] ?? 0;
$current_time  = time();

/* ----------------------------------------
   CHECK OTP EXPIRATION
-----------------------------------------*/
if ($current_time > $otp_end_time) {

    // Delete unverified user if OTP expired
    if (!empty($user['id'])) {
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$user['id']]);
    }

    unset($_SESSION['pending_user']);
    echo "<script>
        alert('❌ Your OTP has expired. Please register again.');
        window.location.href='index.php';
    </script>";
    exit;
}

/* ----------------------------------------
   CSRF TOKEN GENERATION
-----------------------------------------*/
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(16));
}
$csrf_token = $_SESSION['csrf_token'];

/* ----------------------------------------
   HANDLE OTP SUBMISSION
-----------------------------------------*/
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // CSRF check
    if (empty($_POST['csrf_token']) || $_POST['csrf_token'] !== ($_SESSION['csrf_token'] ?? '')) {
        echo "<script>
            alert('Invalid CSRF token. Please refresh the page.');
            window.location.href='verify_otp.php';
        </script>";
        exit;
    }

    $entered_otp = sanitize($_POST['otp'] ?? '');

    if ($entered_otp == $otp_generated) {

        // ----------------------------------------
        // ✅ Activate & Verify User
        //    created_at stays unchanged (correct)
        //    updated_at is set to NOW()
        // ----------------------------------------
        $stmt = $pdo->prepare("
            UPDATE users 
            SET 
                is_verified = 1,
                updated_at = NOW()
            WHERE id = ?
        ");
        $stmt->execute([$user['id']]);

        unset($_SESSION['pending_user']);
        unset($_SESSION['csrf_token']);

        echo "<script>
            alert('✅ Registration successful! You can now login.');
            window.location.href='https://shopnoltd.kesug.com/login.php';
        </script>";
        exit;

    } else {

        // ❌ Invalid OTP → delete user
        if (!empty($user['id'])) {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$user['id']]);
        }

        unset($_SESSION['pending_user']);
        unset($_SESSION['csrf_token']);

        echo "<script>
            alert('❌ Invalid OTP. Registration reset.');
            window.location.href='index.php';
        </script>";
        exit;
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
button { padding: 10px 15px; background: #28a745; border: none; color: white; cursor: pointer; margin-top: 10px; border-radius: 5px; font-size: 16px; width:100%; }
button:hover { background: #218838; }
.timer { color: #ff0000; margin-top: 8px; font-weight: bold; }
.copy-btn { margin-left: 10px; padding: 5px 12px; font-size: 14px; border:none; background:#007bff; color:#fff; border-radius:5px; cursor:pointer; }
.copy-btn:hover { background:#0056b3; }
</style>
</head>
<body>
<div class="container">
    <h2>Verify OTP</h2>
    <p>Enter the 6-digit OTP sent to your phone or email.</p>

    <form method="POST">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
        <input type="text" name="otp" placeholder="Enter OTP" required maxlength="6">
        <button type="submit">Verify & Complete Registration</button>
    </form>

    <p class="timer" id="timer"></p>

    <p style="margin-top:10px; color:gray;">
        Your OTP (testing): 
        <strong id="otpValue"><?php echo htmlspecialchars($otp_generated); ?></strong>
        <button type="button" class="copy-btn" id="copyOtpBtn">Copy</button>
    </p>
</div>

<script>
const endTime = <?php echo (int)$otp_end_time; ?>;
function updateTimer() {
    const now = Math.floor(Date.now() / 1000);
    const remaining = endTime - now;
    const timerElem = document.getElementById('timer');
    if (remaining <= 0) {
        timerElem.textContent = "⏰ OTP expired. Please register again.";
    } else {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        timerElem.textContent = `OTP expires in ${minutes}m ${seconds}s`;
        setTimeout(updateTimer, 1000);
    }
}
updateTimer();

document.getElementById('copyOtpBtn').addEventListener('click', function() {
    navigator.clipboard.writeText(document.getElementById('otpValue').innerText)
        .then(()=> alert('OTP copied!'))
        .catch(()=> alert('Copy failed.'));
});
</script>
</body>
</html>
