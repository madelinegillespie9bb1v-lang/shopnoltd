<?php
session_start();

// Function to generate OTP
function generateOTP($length = 6) {
    $characters = '0123456789';
    $otp = '';
    for ($i = 0; $i < $length; $i++) {
        $otp .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $otp;
}

// Generate OTP and store in session
$otp = generateOTP();
$_SESSION['otp'] = $otp;

// Send OTP as response
echo json_encode(['otp' => $otp]);
?>
