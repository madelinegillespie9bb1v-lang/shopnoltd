<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $latitude = $_POST['latitude'] ?? null;
    $longitude = $_POST['longitude'] ?? null;
    $altitude = $_POST['altitude'] ?? null;
    $precision = $_POST['precision'] ?? null;

    $image1 = $_FILES['image1']['name'] ?? null;
    $image2 = $_FILES['image2']['name'] ?? null;
    $video1 = $_FILES['video1']['name'] ?? null;
    $video2 = $_FILES['video2']['name'] ?? null;

    $uploadsDir = 'uploads/';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0777, true);
    }

    $uploadErrors = [];
    $uploadedFiles = [];

    foreach (['image1', 'image2', 'video1', 'video2'] as $fileKey) {
        if (!empty($_FILES[$fileKey]['name'])) {
            $targetPath = $uploadsDir . basename($_FILES[$fileKey]['name']);
            if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetPath)) {
                $uploadedFiles[$fileKey] = $targetPath;
            } else {
                $uploadErrors[$fileKey] = "Failed to upload " . $_FILES[$fileKey]['name'];
            }
        }
    }

    $data = [
        'latitude' => $latitude,
        'longitude' => $longitude,
        'altitude' => $altitude,
        'precision' => $precision,
        'uploadedFiles' => $uploadedFiles,
        'errors' => $uploadErrors,
    ];

    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'Data saved successfully!',
        'data' => $data,
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method!',
    ]);
}
