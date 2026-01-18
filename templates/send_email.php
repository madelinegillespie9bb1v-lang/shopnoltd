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

// Simple per-session rate limit (more robust: per-IP or DB table)
if (!isset($_SESSION['otp_email_requests'])) {
    $_SESSION['otp_email_requests'] = 0;
}
if ($_SESSION['otp_email_requests'] >= 5) {
    echo "<script>alert('You have reached the OTP request limit. Try again later.'); window.location.href='index.php';</script>";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

$email = trim($_POST['email'] ?? '');

// Server-side validation
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('Please enter a valid email address.'); history.back();</script>";
    exit;
}

try {
    // 1) Check there is a pending registration in DB for this email
    $stmt = $pdo->prepare("SELECT id, username, first_name FROM users WHERE email = ? AND status = 'pending' LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        // No pending registration found: refuse and instruct user to fill registration form first
        echo "<script>
                alert('No pending registration found for this email. Please complete the registration form first.');
                window.location.href='index.php';
              </script>";
        exit;
    }

    // 2) Generate OTP and store in DB (and session optionally)
    $otp = random_int(100000, 999999); // cryptographically better than rand()
    $otp_time = date('Y-m-d H:i:s');

    $update = $pdo->prepare("UPDATE users SET otp = ?, otp_time = ? WHERE id = ?");
    $update->execute([$otp, $otp_time, $user['id']]);

    // Optionally store in session
    $_SESSION['email'] = $email;
    $_SESSION['otp_sent_time'] = time();

    // increment rate limit
    $_SESSION['otp_email_requests']++;

    // 3) Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';          // or your SMTP host/provider
        $mail->SMTPAuth   = true;
        $mail->Username   = 'asaduzzaman.bheramara@gmail.com'; // SMTP username
        $mail->Password   = 'qcty jiqw yjul akcz';       // SMTP app password — do NOT commit real password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // 'tls'
        $mail->Port       = 587;

        // Show sender as your domain address (Gmail is used to send)
        $mail->setFrom('no-reply@shopnoltd.kesug.com', 'Shopnoltd');
        $mail->addReplyTo('support@shopnoltd.kesug.com', 'Shopnoltd Support');
        $mail->addAddress($email, $user['first_name'] ?? '');

        $mail->isHTML(true);
        $mail->Subject = 'Your OTP Code - Shopnoltd';
        $mail->Body = "
            <h2>Shopnoltd Account Verification</h2>
            <p>Hi " . htmlspecialchars($user['first_name'] ?? '') . ",</p>
            <p>Your One-Time Password (OTP) is:</p>
            <h3 style='color:#2e86de;'>$otp</h3>
            <p>This code is valid for 5 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <br><p>Thanks,<br>Shopnoltd Team</p>
        ";

        $mail->send();

        echo "<script>alert('OTP sent to your email. Please check your inbox.'); window.location.href='verify_otp.php';</script>";
        exit;

    } catch (Exception $mailEx) {
        // If sending fails, optionally rollback OTP in DB
        $pdo->prepare("UPDATE users SET otp = NULL, otp_time = NULL WHERE id = ?")->execute([$user['id']]);
        // Do not expose $mailEx->getMessage() in production; log it instead
        error_log('Mail error: ' . $mailEx->getMessage());
        echo "<script>alert('Failed to send OTP email. Please try again later.'); window.location.href='index.php';</script>";
        exit;
    }

} catch (Exception $e) {
    error_log('send_otp_email.php error: ' . $e->getMessage());
    echo "<script>alert('Server error. Please try again later.'); window.location.href='index.php';</script>";
    exit;
}
