<?php
session_start();
header('Content-Type: application/json');
$username = $_SESSION['user']['username'] ?? 'guest';
$baseDir = __DIR__ . "/uploads/user_transactions/manual/$username/" . date('Ymd_His') . "/";
@mkdir($baseDir, 0775, true);

if (isset($_POST['image'])) {
    $imgData = $_POST['image'];
    if (preg_match('/^data:image\/(\w+);base64,/', $imgData, $type)) {
        $imgData = substr($imgData, strpos($imgData, ',') + 1);
        $type = strtolower($type[1]);
        $imgData = base64_decode($imgData);
        $fileName = "screenshot_" . time() . ".$type";
        file_put_contents($baseDir . $fileName, $imgData);
        echo json_encode(['status'=>'success','message'=>'Screenshot captured and saved!']);
        exit;
    }
}

if (isset($_FILES['screenshot'])) {
    $file = $_FILES['screenshot'];
    if ($file['error'] === 0) {
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = "upload_" . time() . "." . $ext;
        move_uploaded_file($file['tmp_name'], $baseDir . $fileName);
        echo json_encode(['status'=>'success','message'=>'File uploaded successfully!']);
        exit;
    }
}

echo json_encode(['status'=>'error','message'=>'No valid screenshot received.']);
