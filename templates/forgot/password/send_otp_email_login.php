<?php
session_start();







require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;





require_once $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/src/Exception.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/src/PHPMailer.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/src/SMTP.php';


// Ensure pending_user session exists
if (!isset($_SESSION['pending_user'])) {
    echo "<script>alert('Session expired or invalid. Please request a new OTP.'); window.location.href='index.php';</script>";
    exit;
}

$user = $_SESSION['pending_user'];

// Fetch latest OTP from database
$stmt = $pdo->prepare("SELECT generated_otp_number, generated_otp_end_time FROM users WHERE id = :id LIMIT 1");
$stmt->execute([':id' => $user['id']]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row || empty($row['generated_otp_number'])) {
    echo "<script>alert('No OTP found. Please request a new OTP.'); window.location.href='index.php';</script>";
    exit;
}

$current_time = time();
$otp = $row['generated_otp_number'];
$otp_end_time = (int)$row['generated_otp_end_time'];

// Check if OTP expired
if ($current_time > $otp_end_time) {
    echo "<script>alert('❌ OTP expired! Please request a new one.'); window.location.href='index.php';</script>";
    exit;
}

// Send OTP via email
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'asaduzzaman.bheramara@gmail.com'; // Gmail SMTP
    $mail->Password   = 'qcty jiqw yjul akcz';             // App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('no-reply@shopnoltd.kesug.com', 'Shopnoltd Password Reset');
    $mail->addReplyTo('support@shopnoltd.kesug.com', 'Shopnoltd Support');
    $mail->addAddress($user['email'], htmlspecialchars($user['username'] ?? 'User'));

    $mail->isHTML(true);
    $mail->Subject = 'Your Shopnoltd Password Reset OTP';
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; color:#333; line-height:1.6;'>
            <h2 style='color:#2e86de;'>Password Reset Request</h2>
            <p>Hello <strong>" . htmlspecialchars($user['username'] ?? 'User') . "</strong>,</p>
            <p>We received a request to reset your password for your Shopnoltd account.</p>
            <p>Please use the following OTP code to verify your identity:</p>
            <h2 style='letter-spacing:2px; color:#27ae60;'>$otp</h2>
            <p>This OTP will expire in <strong>" . ($otp_end_time - $current_time) . " seconds</strong>.</p>
            <p>If you do not see this email in your inbox, please check your <strong>Spam/Junk folder</strong>.</p>
            <p>If you did not request a password reset, please ignore this message.</p>
            <br>
            <p>Kind regards,<br><strong>Shopnoltd Team</strong></p>
        </div>
    ";
    $mail->AltBody = "Hello {$user['username']},\n\nYour password reset OTP is: $otp\nThis code expires in " . ($otp_end_time - $current_time) . " seconds.\nCheck your Spam/Junk folder if you don't see it.\n\n- Shopnoltd Team";

    $mail->send();

    echo "<script>
        alert('OTP has been sent successfully to your email. Please check your inbox or Spam/Junk folder.');
        window.location.href='verify_otp.php';
    </script>";
    exit;

} catch (Exception $e) {
    error_log('Mail sending failed: ' . $mail->ErrorInfo);
    echo "<script>alert('Failed to send OTP email. Please try again later.'); window.location.href='index.php';</script>";
    exit;
}
?>
