<?php
// Enable error reporting for debugging purposes
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Include database connection (adjust as per your database setup)
include('index.php');  // Make sure you have this file for DB connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user input from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $amount = $_POST['amount'];

    // Validate inputs (basic validation, improve as needed)
    if (!empty($name) && !empty($email) && !empty($amount)) {
        // Insert data into the donation table
        $sql = "INSERT INTO donation_table (name, email, amount) VALUES ('$name', '$email', '$amount')";
        
        if (mysqli_query($conn, $sql)) {
            // After successful signup, generate a unique token
            $token = bin2hex(random_bytes(16));  // Generate a unique token

            // You can store the token in the database (optional)
            $donor_id = mysqli_insert_id($conn); // Get last inserted ID
            $update_token_sql = "UPDATE donations SET token = '$token' WHERE id = $donor_id";
            mysqli_query($conn, $update_token_sql);

            // Send token back to user
            echo json_encode([
                'status' => 'success',
                'message' => 'Signup successful!',
                'token' => $token
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Error saving data to database.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'All fields are required.'
        ]);
    }
}
?>
