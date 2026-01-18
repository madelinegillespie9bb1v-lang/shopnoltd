<?php
// Default page is home, unless otherwise specified
$page = isset($_GET['page']) ? $_GET['page'] : 'home';  // Default page is 'home'

// Redirect to the page.php file with the appropriate page name
header("Location: page.php?page=$page");
exit();
?>

<?php
// Database configuration
$host = "sql201.infinityfree.com"; // Replace '201' with your server number
$username = "if0_37909999"; // Your MySQL username
$password = "Asad18081978"; // Your MySQL password
$database = "if0_37909999_db"; // Your database name
$Directory = "/home/vol10_7/infinityfree.com/if0_37909999"; // Your Home Directory name
// Create a connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the page name from the URL
$page = isset($_GET['page']) ? $_GET['page'] : 'home';  // Default page is 'home'

// Fetch content based on page name
$sql = "SELECT * FROM pages WHERE page_name = '$page'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output the content of the page
    $row = $result->fetch_assoc();
    $title = $row['title'];
    $content = $row['content'];
} else {
    $title = "Page Not Found";
    $content = "The page you are looking for does not exist.";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
</head>
<body>
    <!-- Navigation -->
    <ul>
        <li><a href="page.php?page=home">Home</a></li>
        <li><a href="page.php?page=about">About</a></li>
        <li><a href="page.php?page=sign-up">Sign Up</a></li>
        <li><a href="page.php?page=contact">Contact</a></li>
    </ul>

    <!-- Page Content -->
    <h1><?php echo $title; ?></h1>
    <p><?php echo $content; ?></p>
</body>
</html>