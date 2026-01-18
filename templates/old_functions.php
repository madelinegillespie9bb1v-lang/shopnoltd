<?php
// --------------------------
// functions.php
// --------------------------

// ✅ Get User IP
function get_user_ip() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
    }
    return $ip;
}

// ✅ Get country from IP using free GeoIP API
function get_user_country($ip = null) {
    $ip = $ip ?? get_user_ip();
    $country = [
        'country_name' => 'Unknown',
        'country_code' => 'AF'
    ];

    // Use ip-api for free GeoIP lookup
    $url = "http://ip-api.com/json/{$ip}?fields=status,country,countryCode";
    $response = @file_get_contents($url);
    if ($response) {
        $data = json_decode($response, true);
        if ($data['status'] === 'success') {
            $country['country_name'] = $data['country'];
            $country['country_code'] = $data['countryCode'];
        }
    }
    return $country;
}

// ✅ Detect browser & device
function get_device_info() {
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    $device = 'Unknown';
    $browser = 'Unknown';

    // Browser detection
    if (preg_match('/MSIE/i', $userAgent)) $browser = 'Internet Explorer';
    elseif (preg_match('/Trident/i', $userAgent)) $browser = 'Internet Explorer';
    elseif (preg_match('/Firefox/i', $userAgent)) $browser = 'Mozilla Firefox';
    elseif (preg_match('/Chrome/i', $userAgent)) $browser = 'Google Chrome';
    elseif (preg_match('/Safari/i', $userAgent)) $browser = 'Safari';
    elseif (preg_match('/Opera/i', $userAgent)) $browser = 'Opera';
    elseif (preg_match('/Edge/i', $userAgent)) $browser = 'Edge';

    // Device type detection
    if (preg_match('/mobile/i', $userAgent)) $device = 'Mobile';
    elseif (preg_match('/tablet/i', $userAgent)) $device = 'Tablet';
    else $device = 'Desktop';

    return [
        'browser' => $browser,
        'device' => $device
    ];
}

// ✅ Encrypt value
function encrypt_value($value) {
    $key = 'YOUR_SECRET_KEY_123456'; // Change this to your own secret key
    $iv = substr(hash('sha256', 'YOUR_IV_123456'), 0, 16); 
    return openssl_encrypt($value, 'AES-256-CBC', $key, 0, $iv);
}

// ✅ Decrypt value
function decrypt_value($encrypted) {
    $key = 'YOUR_SECRET_KEY_123456'; // Must match encrypt key
    $iv = substr(hash('sha256', 'YOUR_IV_123456'), 0, 16);
    return openssl_decrypt($encrypted, 'AES-256-CBC', $key, 0, $iv);
}

// ✅ Sanitize input
function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// ✅ Generate random OTP
function generate_otp($length = 6) {
    $otp = '';
    for ($i = 0; $i < $length; $i++) {
        $otp .= mt_rand(0, 9);
    }
    return $otp;
}
