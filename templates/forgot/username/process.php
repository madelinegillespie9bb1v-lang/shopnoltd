<?php
require_once '../../../config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../../phpmailer/src/Exception.php';
require '../../../phpmailer/src/PHPMailer.php';
require '../../../phpmailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email address.'); history.back();</script>";
        exit;
    }

    $stmt = $pdo->prepare("SELECT username, first_name FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "<script>alert('No account found with that email.'); history.back();</script>";
        exit;
    }

    // Send username reminder
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'asaduzzaman.bheramara@gmail.com';
        $mail->Password = 'qcty jiqw yjul akcz';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->setFrom('no-reply@shopnoltd.kesug.com', 'Shopnoltd');
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Your Username - Shopnoltd';
        $mail->Body = "<p>Hello {$user['first_name']},<br>Your username is <b>{$user['username']}</b>.<br><br>Regards,<br>Shopnoltd Team</p>";
        $mail->send();

        echo "<script>alert('Username sent to your email.'); window.location.href='/accounts/login/';</script>";
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo "<script>alert('Failed to send email. Try again later.'); history.back();</script>";
    }
}
