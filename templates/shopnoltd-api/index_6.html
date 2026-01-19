<?php
// টোকেন আপনার BotFather থেকে প্রাপ্ত
$botToken = "7494670136:AAEirdzxf02jXgWApqINR2BPWr66kriv1fk";
$apiURL = "https://api.telegram.org/bot$botToken/";

// Webhook থেকে ডেটা সংগ্রহ
$content = file_get_contents("php://input");
$update = json_decode($content, TRUE);

if (!$update) {
    // যদি কোনো ডেটা না থাকে
    exit;
}

if (isset($update["message"])) {
    $chatId = $update["message"]["chat"]["id"];
    $text = $update["message"]["text"];

    // যদি ব্যবহারকারী /start পাঠায়
    if ($text == "/start") {
        sendMessage($chatId, "Welcome to Shopno Toolbox Bot! How can I assist you?");
    } else {
        sendMessage($chatId, "You said: $text");
    }
}

// টেলিগ্রামে মেসেজ পাঠানোর ফাংশন
function sendMessage($chatId, $message) {
    global $apiURL;

    $url = $apiURL . "sendMessage?chat_id=" . $chatId . "&text=" . urlencode($message);
    file_get_contents($url);
}

?>
