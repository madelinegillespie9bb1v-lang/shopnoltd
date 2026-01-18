<?php
session_start();
require_once "db.php";

if (!isset($_SESSION['user'])) exit("Unauthorized");
$userId = $_SESSION['user']['id'];
$action = $_POST['action'] ?? '';

if ($action === 'post') {
  $content = trim($_POST['content'] ?? '');
  if ($content !== '') {
    $stmt = $pdo->prepare("INSERT INTO posts (user_id, content) VALUES (?,?)");
    $stmt->execute([$userId, $content]);
  }
  exit('ok');
}

if ($action === 'fetch') {
  $sql = "SELECT p.*, u.username, u.profile_pic,
          (SELECT COUNT(*) FROM likes WHERE post_id=p.id) AS likes,
          (SELECT COUNT(*) FROM comments WHERE post_id=p.id) AS comments
          FROM posts p
          JOIN users u ON u.id=p.user_id
          ORDER BY p.id DESC LIMIT 20";
  $stmt = $pdo->query($sql);
  echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

if ($action === 'like') {
  $postId = (int)$_POST['post_id'];
  $stmt = $pdo->prepare("INSERT INTO likes (post_id, user_id) VALUES (?,?)");
  $stmt->execute([$postId, $userId]);
  exit('ok');
}
?>
