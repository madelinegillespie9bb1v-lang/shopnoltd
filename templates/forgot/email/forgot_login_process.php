<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';



// ✅ Collect form inputs safely
$username   = trim($_POST['username'] ?? '');
$phone_code = trim($_POST['phone_code'] ?? '');
$phone      = trim($_POST['phone'] ?? '');

// ✅ Basic validation
if (empty($username) || empty($phone_code) || empty($phone)) {
    echo "<script>alert('Please provide username, country code, and phone number!'); window.history.back();</script>";
    exit;
}

// ✅ Normalize input (remove spaces, plus signs, and leading zeros)
$phone_code = preg_replace('/[^0-9+]/', '', $phone_code);
$phone      = preg_replace('/\D/', '', $phone);
$phone_normalized = ltrim($phone, '0');
$fullphone = $phone_code . $phone_normalized;

// ✅ Build a flexible phone match
// Users may be stored as: +8801911866493 OR 8801911866493 OR 1911866493
// We'll try all possible matches.
$phone_variants = [
    $fullphone,
    ltrim($fullphone, '+'),
    $phone_code . $phone,
    '+' . $phone_code . $phone,
    '+' . $phone_code . ltrim($phone, '0'),
    $phone_code . ltrim($phone, '0'),
    $phone, // last fallback
];

try {
    // ✅ Dynamically build placeholders for flexible phone search
    $placeholders = implode(',', array_fill(0, count($phone_variants), '?'));

    $query = "SELECT * FROM users 
              WHERE username = ? 
              AND REPLACE(REPLACE(REPLACE(phone, ' ', ''), '-', ''), '+', '') IN (" . 
              implode(',', array_fill(0, count($phone_variants), '?')) . ") 
              LIMIT 1";

    $stmt = $pdo->prepare($query);
    $params = array_merge([$username], array_map(function($p){
        return preg_replace('/\D/', '', $p); // remove + and non-digits for match
    }, $phone_variants));
    $stmt->execute($params);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "<script>alert('No account found with this username and phone number!'); window.history.back();</script>";
        exit;
    }

    // ✅ Generate OTP
    $otp_number = random_int(100000, 999999);
    $otp_valid_minutes = 10;
    $otp_time = time();
    $otp_end_time = $otp_time + ($otp_valid_minutes * 60);

    // ✅ Update OTP info
    $update = $pdo->prepare("UPDATE users 
        SET generated_otp_number = :otp, 
            generated_otp_time = :otp_time, 
            generated_otp_end_time = :otp_end 
        WHERE id = :id");
    $update->execute([
        ':otp'      => $otp_number,
        ':otp_time' => date('Y-m-d H:i:s', $otp_time),
        ':otp_end'  => date('Y-m-d H:i:s', $otp_end_time),
        ':id'       => $user['id']
    ]);

    // ✅ Store session
    $_SESSION['pending_user'] = [
        'id'         => $user['id'],
        'username'   => $user['username'],
        'phone'      => $user['phone'],
        'user_role'  => $user['user_role'] ?? 'user',
        'otp'        => $otp_number,
        'otp_time'   => $otp_time,
        'otp_end'    => $otp_end_time
    ];

    // ✅ OTP message and redirect
    $expiry_time_formatted = date('h:i:s A', $otp_end_time);
    $otp_msg = "✅ OTP sent! Please verify within {$otp_valid_minutes} minutes.\nYour OTP: $otp_number\n⏰ Expires at: $expiry_time_formatted";
    $otp_msg_js = str_replace("\n", "\\n", $otp_msg);

    echo "<script>
        alert('{$otp_msg_js}');
        window.location.href='verify_otp.php';
    </script>";
    exit;

} catch (PDOException $e) {
    echo "<script>alert('Database error: " . htmlspecialchars($e->getMessage()) . "'); window.history.back();</script>";
    exit;
} catch (Exception $e) {
    echo "<script>alert('Unexpected error: " . htmlspecialchars($e->getMessage()) . "'); window.history.back();</script>";
    exit;
}
