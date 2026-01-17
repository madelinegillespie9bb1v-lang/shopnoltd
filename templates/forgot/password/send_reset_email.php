<?php





require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require_once $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/src/Exception.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/src/PHPMailer.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/phpmailer/src/SMTP.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email.'); history.back();</script>";
        exit;
    }

    $stmt = $pdo->prepare("SELECT id, username FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$user) {
        echo "<script>alert('No account found.'); history.back();</script>";
        exit;
    }

    $token = bin2hex(random_bytes(32));
    $expiry = date('Y-m-d H:i:s', time() + 900); // 15 minutes

    $pdo->prepare("UPDATE users SET reset_token=?, reset_expiry=? WHERE id=?")
        ->execute([$token, $expiry, $user['id']]);

    $link = "https://shopnoltd.kesug.com/accounts/forgot/password/reset.php?token=$token";

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
        $mail->Subject = 'Password Reset - Shopnoltd';
        $mail->Body = "
          <p>Click below to reset your password (valid for 15 minutes):</p>
          <p><a href='$link'>$link</a></p>
        ";
        $mail->send();

        echo "<script>alert('Password reset link sent to your email.'); window.location.href='/accounts/login/';</script>";
    } catch (Exception $e) {
        error_log($e->getMessage());
        echo "<script>alert('Error sending reset email.'); history.back();</script>";
    }
}
