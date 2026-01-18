<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';
session_start();

if (empty($_SESSION['user'])) {
    echo json_encode(['status' => 'error', 'message' => 'Login required']);
    exit;
}

$sender = $_SESSION['user']['id'];
$receiver = (int)($_POST['receiver_id'] ?? 0);
$message = trim($_POST['message'] ?? '');

if (!$receiver || !$message) {
    echo json_encode(['status' => 'error', 'message' => 'Missing fields']);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO user_messages (sender_id, receiver_id, message, created_at) VALUES (?, ?, ?, NOW())");
$stmt->execute([$sender, $receiver, $message]);

echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
