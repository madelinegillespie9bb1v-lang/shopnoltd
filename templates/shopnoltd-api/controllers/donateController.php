<?php
// ডোনেশন সম্পর্কিত লজিক
function processDonation($fullName, $username, $email, $phoneNumber, $amount, $currency, $login_token, $userId) {
    global $conn;

    // ইনপুট ভ্যালিডেশন
    if (empty($fullName) || empty($username) || empty($email) || empty($phoneNumber) || empty($amount) || empty($currency) || empty($userId)) {
        return json_encode(['status' => 'error', 'message' => 'Invalid input. Please fill in all required fields.']);
    }

    // ডাটাবেসে ডোনেশন ইনসার্ট
    try {
        $stmt = $conn->prepare("INSERT INTO donations (fullName, username, email, phoneNumber, amount, currency, login_token, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$fullName, $username, $email, $phoneNumber, $amount, $currency, $login_token, $userId]);

        return json_encode([
            'status' => 'success',
            'message' => 'Donation received successfully.',
            'data' => [
                'fullName' => $fullName,
                'username' => $username,
                'email' => $email,
                'phoneNumber' => $phoneNumber,
                'amount' => $amount,
                'currency' => $currency,
                'login_token' => $login_token,
                'user_id' => $userId
            ]
        ]);
    } catch (PDOException $e) {
        return json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
