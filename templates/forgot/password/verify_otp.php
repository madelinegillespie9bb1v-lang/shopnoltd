<?php
session_start();





require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';


// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check pending OTP session
if (!isset($_SESSION['pending_user'])) {
    echo "<script>alert('Session expired or invalid. Please request a new OTP.'); window.location.href='index.php';</script>";
    exit;
}

$user = $_SESSION['pending_user'];

// Handle OTP submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entered_otp = trim($_POST['otp'] ?? '');
    if (empty($entered_otp)) {
        echo "<script>alert('Please enter the OTP.');</script>";
    } else {
        try {
            // Fetch OTP info from DB
            $stmt = $pdo->prepare("
                SELECT generated_otp_number, generated_otp_time, generated_otp_end_time
                FROM users
                WHERE id = :id
                LIMIT 1
            ");
            $stmt->execute([':id' => $user['id']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$row || empty($row['generated_otp_number'])) {
                echo "<script>alert('❌ No OTP found. Please request a new OTP.'); window.location.href='index.php';</script>";
                exit;
            }

            $current_time = time();
            $otp_end_time = (int)$row['generated_otp_end_time'];

            // Check OTP expiration
            if ($current_time > $otp_end_time) {
                // Clear expired OTP
                $clear = $pdo->prepare("
                    UPDATE users
                    SET generated_otp_number = NULL,
                        generated_otp_time = NULL,
                        generated_otp_end_time = NULL,
                        generated_otp_count_time = 0
                    WHERE id = :id
                ");
                $clear->execute([':id' => $user['id']]);

                echo "<script>alert('❌ OTP expired! Please request a new one.'); window.location.href='index.php';</script>";
                exit;
            }

            // Verify OTP
            if ($entered_otp === $row['generated_otp_number']) {
                // OTP is correct → clear OTP fields
                $clear = $pdo->prepare("
                    UPDATE users
                    SET generated_otp_number = NULL,
                        generated_otp_time = NULL,
                        generated_otp_end_time = NULL,
                        generated_otp_count_time = 0
                    WHERE id = :id
                ");
                $clear->execute([':id' => $user['id']]);

                // Mark user as verified
                $_SESSION['verified_user'] = [
                    'id'       => $user['id'],
                    'username' => $user['username'] ?? '',
                    'email'    => $user['email'] ?? '',
                    'user_role'=> $user['user_role'] ?? ''
                ];
                unset($_SESSION['pending_user']);

                echo "<script>
                    alert('✅ OTP verified successfully! Please proceed to reset your password.');
                    window.location.href='reset.php';
                </script>";
                exit;
            } else {
                echo "<script>alert('❌ Invalid OTP. Please try again.');</script>";
            }

        } catch (Exception $e) {
            error_log("verify_otp.php DB error: " . $e->getMessage());
            echo "<script>alert('Database error. Please try again later.');</script>";
        }
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
.container { max-width: 400px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
input { width: 100%; padding: 10px; margin-top: 10px; border-radius: 5px; border: 1px solid #ccc; }
button { padding: 10px 15px; background: #25D366; border: none; color: white; cursor: pointer; margin-top: 10px; border-radius: 5px; }
</style>
</head>
<body>
<div class="container">
    <h2>Verify OTP</h2>
    <p>Enter the 6-digit OTP sent to your email. Check Spam/Junk folder if you don't see it.</p>

    <form method="POST">
        <input type="text" name="otp" placeholder="Enter OTP" required maxlength="6">
        <button type="submit">Verify</button>
    </form>
    <p style="margin-top:10px; color:gray;">
        (Check your inbox and Spam/Junk folder if you do not see the email also set it is safe.)
    </p> 
</div>
</body>
</html>
