<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Debugging SSL Test";
?>




<?php
// Disable SSL verification
$contextOptions = [
    "ssl" => [
        "verify_peer" => false,
        "verify_peer_name" => false,
    ]
];

$context = stream_context_create($contextOptions);

// Read incoming updates
$update = file_get_contents("php://input", false, $context);
$updateArray = json_decode($update, true);

// Handle incoming updates
if (!empty($updateArray)) {
    $chatId = $updateArray["message"]["chat"]["id"];
    $message = $updateArray["message"]["text"];

    // Respond to user
    $responseText = "You said: $message";
    $url = "https://api.telegram.org/bot7494670136:AAEirdzxf02jXgWApqINR2BPWr66kriv1fk/sendMessage";
    $data = [
        "chat_id" => $chatId,
        "text" => $responseText,
    ];

    $options = [
        "http" => [
            "header" => "Content-type: application/json\r\n",
            "method" => "POST",
            "content" => json_encode($data),
        ],
    ];

    $context = stream_context_create($options);
    file_get_contents($url, false, $context);
}
?>
