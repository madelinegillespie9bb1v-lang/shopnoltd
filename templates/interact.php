<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';
session_start();

if (empty($_SESSION['user'])) exit(json_encode(['status'=>'error','message'=>'Login required']));

$userId = $_SESSION['user']['id'];
$targetId = (int)($_POST['id'] ?? 0);
$type = $_POST['type'] ?? '';
$action = $_POST['action'] ?? '';

if (!$targetId || !$type || !$action) exit(json_encode(['status'=>'error','message'=>'Invalid data']));

switch ($action) {
  case 'like':
    $stmt = $pdo->prepare("INSERT INTO user_likes (user_id, target_type, target_id, created_at) VALUES (?, ?, ?, NOW())");
    break;
  case 'comment':
    $stmt = $pdo->prepare("INSERT INTO user_comments (user_id, target_type, target_id, comment, created_at) VALUES (?, ?, ?, 'Nice post!', NOW())");
    break;
  case 'share':
    $stmt = $pdo->prepare("INSERT INTO user_shares (user_id, target_type, target_id, created_at) VALUES (?, ?, ?, NOW())");
    break;
  default:
    exit(json_encode(['status'=>'error','message'=>'Unknown action']));
}
$stmt->execute([$userId, $type, $targetId]);
echo json_encode(['status'=>'success','message'=>ucfirst($action) . ' added successfully']);
