<?php
session_start();
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/phpmailer/src/SMTP.php';
require_once __DIR__ . '/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (!isset($_SESSION['user'])) exit("Unauthorized");

$userId = $_SESSION['user']['id'];
$action = $_POST['action'] ?? '';

// ------------------ SEND MESSAGE ------------------
if ($action === 'send') {
    $receiverId = $_POST['receiver_id'] ?: null;
    $message = trim($_POST['message'] ?? '');

    if ($message !== '') {
        // Save message in DB
        $stmt = $pdo->prepare("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?,?,?)");
        $stmt->execute([$userId, $receiverId, $message]);

        // Send notifications if private
        if ($receiverId) {
            try {
                // Get sender & receiver info
                $getUser = $pdo->prepare("SELECT id, username, email, phone_code, phone FROM users WHERE id IN (?,?)");
                $getUser->execute([$userId, $receiverId]);
                $users = $getUser->fetchAll(PDO::FETCH_ASSOC);

                $sender = null;
                $receiver = null;
                foreach ($users as $u) {
                    if ($u['id'] == $userId) $sender = $u;
                    if ($u['id'] == $receiverId) $receiver = $u;
                }

                // ------------- EMAIL -------------
                if ($receiver && !empty($receiver['email'])) {
                    $mail = new PHPMailer(true);
                    $mail->isSMTP();
                    $mail->Host       = 'smtp.gmail.com';
                    $mail->SMTPAuth   = true;
                    $mail->Username   = 'asaduzzaman.bheramara@gmail.com'; // SMTP username
                    $mail->Password   = 'qcty jiqw yjul akcz';             // SMTP app password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port       = 587;

                    $mail->setFrom('no-reply@shopnoltd.kesug.com', 'Shopnoltd');
                    $mail->addReplyTo('support@shopnoltd.kesug.com', 'Shopnoltd Support');
                    $mail->addAddress($receiver['email'], $receiver['username'] ?? '');

                    $mail->isHTML(true);
                    $mail->Subject = "📩 New Message from {$sender['username']}";
                    $chatUrl = BASE_URL . '/contact.php';
                    $mail->Body = "
                        <div style='font-family:Segoe UI, sans-serif;'>
                            <p>Hi <b>{$receiver['username']}</b>,</p>
                            <p>You have a new message from <b>{$sender['username']}</b>:</p>
                            <blockquote style='border-left:3px solid #007bff;padding-left:10px;color:#333;'>{$message}</blockquote>
                            <p>👉 <a href='{$chatUrl}'>Open Chat</a></p>
                            <p style='font-size:12px;color:#888;'>This is an automated message from Shopnoltd Contact Center.</p>
                        </div>
                    ";
                    $mail->send();
                }

                // ------------- SMS via CallMeBot -------------
                if ($receiver && !empty($receiver['phone'])) {
                    $fullPhone = $receiver['phone_code'] . $receiver['phone'];
                    $smsMessage = urlencode("New message from {$sender['username']}: {$message}");

                    // Replace with your free CallMeBot API key
                    $CALLMEBOT_API_KEY = "YOUR_CALLMEBOT_API_KEY";

                    $smsApiUrl = "https://api.callmebot.com/sms.php?phone={$fullPhone}&text={$smsMessage}&apikey={$CALLMEBOT_API_KEY}";
                    @file_get_contents($smsApiUrl); // trigger SMS
                }

            } catch (Exception $e) {
                error_log("Notification failed: " . $e->getMessage());
            }
        }
    }

    exit('ok');
}

// ------------------ FETCH MESSAGES ------------------
if ($action === 'fetch') {
    $receiverId = $_POST['receiver_id'] ?: null;

    if ($receiverId) {
        $stmt = $pdo->prepare("
            SELECT m.*, u.username 
            FROM messages m
            JOIN users u ON u.id = m.sender_id
            WHERE (m.sender_id = ? AND m.receiver_id = ?) 
               OR (m.sender_id = ? AND m.receiver_id = ?)
            ORDER BY m.id DESC LIMIT 30
        ");
        $stmt->execute([$userId, $receiverId, $receiverId, $userId]);
    } else {
        $stmt = $pdo->query("
            SELECT m.*, u.username 
            FROM messages m 
            JOIN users u ON u.id = m.sender_id 
            WHERE receiver_id IS NULL 
            ORDER BY m.id DESC LIMIT 30
        ");
    }

    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(array_reverse($messages));
}
?>
