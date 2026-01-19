<?php
// ============================================================
// ✅ Database configuration for Render Postgres (Secure + Updated)
// ============================================================

$host = "dpg-d5mal114tr6s73cgm0g0-a";
$port = 5432;
$dbname = "shopnoltd_db";
$username = "shopnoltd_user";
$password = "7YMRHmFW5WIij5U3BWEJXLvQumUhISJE";

try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$dbname",
        $username,
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Display exact error only when debugging
    die("❌ Database connection failed: " . htmlspecialchars($e->getMessage()));
}

// ============================================================
// ✅ Global constants
// ============================================================

define('BASE_URL', 'https://shopnoltd-dashboard.onrender.com'); // Updated to Render
define('ENCRYPTION_KEY', 'e51a7fbc10d62e1b4a9fce18a8df5c3e'); // Keep same forever!

// ============================================================
// ✅ Encryption helpers
// ============================================================

function encrypt_value($plain)
{
    if (empty($plain)) return null;
    $method = 'AES-256-CBC';
    $key = ENCRYPTION_KEY;
    $iv = random_bytes(openssl_cipher_iv_length($method));
    $cipher = openssl_encrypt($plain, $method, $key, OPENSSL_RAW_DATA, $iv);
    return base64_encode($iv . $cipher);
}

function decrypt_value($encoded)
{
    if (empty($encoded)) return null;
    $method = 'AES-256-CBC';
    $key = ENCRYPTION_KEY;
    $data = base64_decode($encoded);
    $ivlen = openssl_cipher_iv_length($method);
    $iv = substr($data, 0, $ivlen);
    $cipher = substr($data, $ivlen);
    return openssl_decrypt($cipher, $method, $key, OPENSSL_RAW_DATA, $iv);
}

// ============================================================
// ✅ Detect IP, Country, Browser, Device
// ============================================================

function get_user_ip() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) return $_SERVER['HTTP_CF_CONNECTING_IP'];
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
    return $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';
}

function get_user_country() {
    $ip = get_user_ip();
    if ($ip === '127.0.0.1' || $ip === '::1') {
        return ['country_name' => 'Localhost', 'country_code' => 'XX'];
    }

    $api_url = "https://ipapi.co/{$ip}/json/";
    $context = stream_context_create(['http' => ['timeout' => 2]]);
    $response = @file_get_contents($api_url, false, $context);

    if ($response) {
        $data = json_decode($response, true);
        if (is_array($data)) {
            return [
                'country_name' => $data['country_name'] ?? 'Unknown',
                'country_code' => $data['country_code'] ?? 'XX'
            ];
        }
    }
    return ['country_name' => 'Unknown', 'country_code' => 'XX'];
}

function get_device_info() {
    $ua = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    return [
        'user_agent' => $ua,
        'browser'    => get_browser_name($ua),
        'device'     => get_device_type($ua)
    ];
}

function get_browser_name($ua) {
    if (stripos($ua, 'Edge') !== false) return 'Microsoft Edge';
    if (stripos($ua, 'Chrome') !== false) return 'Google Chrome';
    if (stripos($ua, 'Firefox') !== false) return 'Mozilla Firefox';
    if (stripos($ua, 'Safari') !== false) return 'Safari';
    if (stripos($ua, 'Opera') !== false || stripos($ua, 'OPR/') !== false) return 'Opera';
    return 'Unknown';
}

function get_device_type($ua) {
    if (preg_match('/mobile/i', $ua)) return 'Mobile';
    if (preg_match('/tablet/i', $ua)) return 'Tablet';
    if (preg_match('/windows|macintosh|linux/i', $ua)) return 'Desktop';
    return 'Unknown';
}

// ============================================================
// ✅ Automatically log visitors (login attempt tracking)
// ============================================================

try {
    if (isset($pdo)) {
        $ip = get_user_ip();
        $country = get_user_country();
        $device = get_device_info();

        // Only insert if this IP hasn't logged within 1 minute
        $check = $pdo->prepare("
            SELECT id FROM logged_users 
            WHERE ip_address = :ip AND login_time > NOW() - INTERVAL '1 minute'
        ");
        $check->execute(['ip' => $ip]);

        if ($check->rowCount() === 0) {
            $insert = $pdo->prepare("
                INSERT INTO logged_users 
                (ip_address, login_country, browser, device_type, login_time)
                VALUES (:ip, :country, :browser, :device, NOW())
            ");
            $insert->execute([
                'ip' => $ip,
                'country' => $country['country_name'],
                'browser' => $device['browser'],
                'device' => $device['device']
            ]);
        }
    }
} catch (Exception $e) {
    // Silent fail — prevents 500 errors from logging failure
}
?>
