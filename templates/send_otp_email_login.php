<?php
session_start();
require_once $_SERVER['DOCUMENT_ROOT'].'/config.php';
// Admin check
$admin = $_SESSION['user'] ?? null;
if (!$admin || ($admin['user_role'] ?? '') !== 'admin') {
    header('Location: /login.php');
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../phpmailer/src/Exception.php';
require '../../phpmailer/src/PHPMailer.php';
require '../../phpmailer/src/SMTP.php';

// --- RATE LIMIT: simple session-based ---
if (!isset($_SESSION['otp_email_requests'])) {
    $_SESSION['otp_email_requests'] = 0;
}
if ($_SESSION['otp_email_requests'] >= 5) {
    echo "<script>alert('You have reached the OTP request limit. Try again later.'); window.location.href='index.php';</script>";
    exit;
}

// --- METHOD CHECK ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

// --- EMAIL VALIDATION ---
$email = trim($_POST['email'] ?? '');
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Please enter a valid email address.'); history.back();</script>";
    exit;
}

try {
    // --- CHECK USER STATUS ---
    $stmt = $pdo->prepare("SELECT id, first_name, username, status FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "<script>alert('No account found with this email. Please register first.'); window.location.href='../register/index.php';</script>";
        exit;
    }

    // If already active, send to login
    if ($user['status'] === 'active') {
        echo "<script>alert('Your account is already verified. Please log in.'); window.location.href='../login/';</script>";
        exit;
    }

    // --- GENERATE OTP ---
    $otp = random_int(100000, 999999);
    $hashed_otp = password_hash($otp, PASSWORD_DEFAULT);
    $otp_time = date('Y-m-d H:i:s');

    // --- UPDATE USER RECORD ---
    $update = $pdo->prepare("UPDATE users SET otp = ?, otp_time = ? WHERE id = ?");
    $update->execute([$hashed_otp, $otp_time, $user['id']]);

    // --- STORE SESSION DATA ---
    $_SESSION['email'] = $email;
    $_SESSION['otp_sent_time'] = time();
    $_SESSION['otp_email_requests']++;

    // --- CONFIGURE PHPMailer ---
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'asaduzzaman.bheramara@gmail.com';         // Replace with your SMTP username
    $mail->Password   = 'qcty jiqw yjul akcz';            // Replace with your app-specific password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // --- MAIL HEADERS ---
    $mail->setFrom('no-reply@shopnoltd.kesug.com', 'Shopnoltd');
    $mail->addReplyTo('support@shopnoltd.kesug.com', 'Shopnoltd Support');
    $mail->addAddress($email, htmlspecialchars($user['first_name'] ?? ''));

    // --- EMAIL CONTENT ---
    $mail->isHTML(true);
    $mail->Subject = 'Your OTP Code - Shopnoltd Account Verification';
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; color:#333;'>
            <h2 style='color:#2e86de;'>Shopnoltd Account Verification</h2>
            <p>Hello <strong>" . htmlspecialchars($user['first_name'] ?? 'User') . "</strong>,</p>
            <p>Your one-time verification code is:</p>
            <h2 style='letter-spacing:2px; color:#27ae60;'>$otp</h2>
            <p>This code will expire in <strong>5 minutes</strong>.</p>
            <p>If you did not request this, please ignore this email.</p>
            <br>
            <p>Best regards,<br><strong>Shopnoltd Team</strong></p>
        </div>
    ";

    // --- SEND EMAIL ---
    $mail->send();

    echo "<script>
        alert('OTP sent successfully! Please check your inbox and enter the code to verify your account.');
        window.location.href='verify_otp.php';
    </script>";
    exit;

} catch (Exception $mailEx) {
    error_log('Mail error: ' . $mailEx->getMessage());
    echo "<script>alert('Failed to send OTP. Please try again later.'); window.location.href='index.php';</script>";
    exit;
} catch (Throwable $e) {
    error_log('send_otp_email_login.php error: ' . $e->getMessage());
    echo "<script>alert('Server error. Please try again later.'); window.location.href='index.php';</script>";
    exit;
}
?>
