<?php
// Database connection settings
$host = 'sql201.infinityfree.com';
$dbname = 'if0_37909999_db';
$username = 'if0_37909999';
$password = 'Asad18081978';

try {
    // Establish database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve GPS data
    $latitude = $_POST['latitude'] ?? null;
    $longitude = $_POST['longitude'] ?? null;
    $altitude = $_POST['altitude'] ?? null;
    $precision = $_POST['precision'] ?? null;

    // Retrieve other fields
    $shop_number = $_POST['shop_number'] ?? null;
    $road_type = $_POST['road_type'] ?? null;
    $district_name = $_POST['district_name'] ?? null;
    $interviewer_name = $_POST['interviewer_name'] ?? null;
    $supervisor_name = $_POST['supervisor_name'] ?? null;
    $bazar_name = $_POST['bazar_name'] ?? null;
    $shop_name = $_POST['shop_name'] ?? null;
    $landmark = $_POST['landmark'] ?? null;
    $union_name = $_POST['union_name'] ?? null;
    $thana_name = $_POST['thana_name'] ?? null;
    $shop_owner_name = $_POST['shop_owner_name'] ?? null;
    $mobile = $_POST['mobile'] ?? null;
    $interaction_type = $_POST['interaction_type'] ?? null;

    // Initialize image path variable
    $imagePath = null;

    // Handle image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $imageTmpPath = $_FILES['image']['tmp_name'];
        $imageName = uniqid() . '-' . basename($_FILES['image']['name']);
        $uploadDir = 'uploads/';
        $imagePath = $uploadDir . $imageName;

        // Ensure upload directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Move uploaded file to the server
        if (!move_uploaded_file($imageTmpPath, $imagePath)) {
            die("Error uploading the image.");
        }
    }

    try {
        // Prepare SQL query
        $sql = "INSERT INTO crown_cement_census_2025 (
                    start_geopoint_latitude, 
                    start_geopoint_longitude, 
                    start_geopoint_altitude, 
                    start_geopoint_precision, 
                    shop_number, 
                    road_type, 
                    district_name, 
                    interviewer_name, 
                    supervisor_name, 
                    bazar_name, 
                    shop_name, 
                    landmark, 
                    union_name, 
                    thana_name, 
                    shop_owner_name, 
                    mobile, 
                    interaction_type, 
                    photo_point_and_shoot_url
                ) VALUES (
                    :latitude, :longitude, :altitude, :precision, 
                    :shop_number, :road_type, :district_name, :interviewer_name, 
                    :supervisor_name, :bazar_name, :shop_name, :landmark, 
                    :union_name, :thana_name, :shop_owner_name, :mobile, 
                    :interaction_type, :imagePath
                )";

        // Bind parameters and execute query
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':latitude' => $latitude,
            ':longitude' => $longitude,
            ':altitude' => $altitude,
            ':precision' => $precision,
            ':shop_number' => $shop_number,
            ':road_type' => $road_type,
            ':district_name' => $district_name,
            ':interviewer_name' => $interviewer_name,
            ':supervisor_name' => $supervisor_name,
            ':bazar_name' => $bazar_name,
            ':shop_name' => $shop_name,
            ':landmark' => $landmark,
            ':union_name' => $union_name,
            ':thana_name' => $thana_name,
            ':shop_owner_name' => $shop_owner_name,
            ':mobile' => $mobile,
            ':interaction_type' => $interaction_type,
            ':imagePath' => $imagePath
        ]);

        echo "Data successfully saved!";
    } catch (PDOException $e) {
        echo "Error saving data: " . $e->getMessage();
    }
} else {
    echo "Invalid request method.";
}
?>


// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        alert("You Qr is : " + decodeText, decodeResult);
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

