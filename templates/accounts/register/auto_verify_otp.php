<?php
session_start();
require_once __DIR__ . '/../../config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first_name  = trim($_POST['first_name'] ?? '');
    $last_name   = trim($_POST['last_name'] ?? '');
    $username    = trim($_POST['username'] ?? '');
    $email       = trim($_POST['email'] ?? '');
    $phone_code  = trim($_POST['phone_code'] ?? '');
    $phone       = trim($_POST['phone'] ?? '');
    $password    = trim($_POST['password'] ?? '');
    $language    = trim($_POST['language'] ?? 'en');

    // ✅ Check if account already exists
    $check = $pdo->prepare("SELECT * FROM users WHERE email = :email OR phone = :phone OR username = :username");
    $check->execute([':email' => $email, ':phone' => $phone, ':username' => $username]);
    $existing = $check->fetch();

    if ($existing) {
        echo "<script>alert('⚠️ This account already exists!');window.location.href='index.php';</script>";
        exit;
    }

    // ✅ Generate a random 6-digit OTP
    $otp = rand(100000, 999999);

    // ✅ Store temporary data in session
    $_SESSION['pending_user'] = [
        'first_name' => $first_name,
        'last_name'  => $last_name,
        'username'   => $username,
        'email'      => $email,
        'phone_code' => $phone_code,
        'phone'      => $phone,
        'password'   => $password,
        'language'   => $language,
        'otp'        => $otp
    ];

    // ✅ Simulate sending OTP (later you can integrate WhatsApp or email)
    // For now, show OTP on next page for testing
    header("Location: verify_otp.php");
    exit;
}
?>
