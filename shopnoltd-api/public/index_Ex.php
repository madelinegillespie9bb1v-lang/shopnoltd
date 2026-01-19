<?php
session_start();

// Database connection
$host = 'sql201.infinityfree.com'; 
$dbname = 'if0_37909999_db'; 
$username = 'if0_37909999'; 
$password = 'Asad18081978';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]));
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user input
    $fullName = $_POST['fullName'] ?? '';
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $PhoneNumber = $_POST['PhoneNumber'] ?? '';
    $amount = $_POST['amount'] ?? 0;
    $country = $_POST['country'] ?? 'US';

    // Validate input
    if (empty($fullName) || empty($username) || empty($email) || empty($PhoneNumber) || empty($amount)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
        exit;
    }

    if (!preg_match('/^\+?\d+$/', $PhoneNumber)) {
        echo json_encode(['status' => 'error', 'message' => 'Phone number must include country code.']);
        exit;
    }

    // Check if username, email, or phone number already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM donations WHERE username = ? OR email = ? OR PhoneNumber = ?");
    $stmt->execute([$username, $email, $PhoneNumber]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username, email, or phone number already exists.']);
        exit;
    }

    // Insert new data
    $currency = getCurrencyByCountry($country);
    $login_token = bin2hex(random_bytes(16));

    try {
        $stmt = $conn->prepare("INSERT INTO donations (fullName, username, email, PhoneNumber, amount, currency, login_token, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$fullName, $username, $email, $PhoneNumber, $amount, $currency, $login_token]);

        // Redirect to email provider's homepage based on the email domain
        $emailDomain = explode('@', $email)[1];
        $emailProviders = [
            'gmail.com' => 'https://mail.google.com/',
            'yahoo.com' => 'https://mail.yahoo.com/',
            'outlook.com' => 'https://outlook.live.com/',
            'hotmail.com' => 'https://outlook.live.com/',
            'icloud.com' => 'https://www.icloud.com/mail/',
            // Add more email providers as needed
        ];

        $redirectUrl = $emailProviders[$emailDomain] ?? 'https://www.google.com/';
        header("Location: $redirectUrl");
        exit;

    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        exit;
    }
}

// Function to get currency by country
function getCurrencyByCountry($countryCode) {
    $currencies = [
        'US' => 'USD',
        'CA' => 'CAD',
        'GB' => 'GBP',
        'IN' => 'INR',
        'AU' => 'AUD',
        'DE' => 'EUR',
    ];
    return $currencies[$countryCode] ?? 'USD';
}
?>
