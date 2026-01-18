<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';
session_start();

if (empty($_SESSION['user'])) exit(json_encode(['status'=>'error','message'=>'Login required']));

$userId = $_SESSION['user']['id'];
$title = trim($_POST['title'] ?? '');
$video = $_FILES['video'] ?? null;

if (!$title || !$video) exit(json_encode(['status'=>'error','message'=>'Missing fields']));

$dir = '/uploads/reels/' . $userId;
@mkdir($_SERVER['DOCUMENT_ROOT'] . $dir, 0777, true);
$path = $dir . '/' . time() . '_' . basename($video['name']);
move_uploaded_file($video['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . $path);

$stmt = $pdo->prepare("INSERT INTO user_reels (user_id, title, video_path, created_at) VALUES (?, ?, ?, NOW())");
$stmt->execute([$userId, $title, $path]);

echo json_encode(['status'=>'success','message'=>'Reel uploaded successfully']);
