<?php
session_start();






require_once $_SERVER['DOCUMENT_ROOT'] . '/config.php';



// Enable error reporting (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ✅ Check if user is verified via OTP
if (!isset($_SESSION['verified_user'])) {
    echo "<script>alert('Unauthorized access. Please verify OTP first.');window.location.href='/login.php';</script>";
    exit;
}

$user = $_SESSION['verified_user'];

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = trim($_POST['password'] ?? '');
    $confirm  = trim($_POST['confirm_password'] ?? '');

    // Basic validations
    if (empty($password) || empty($confirm)) {
        $error = "Please fill in all fields.";
    } elseif ($password !== $confirm) {
        $error = "Passwords do not match.";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters long.";
    } else {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        try {
            $stmt = $pdo->prepare("UPDATE users SET password = :password WHERE id = :id");
            $stmt->execute([
                ':password' => $password_hash,
                ':id'       => $user['id']
            ]);

            unset($_SESSION['verified_user'], $_SESSION['pending_user']);

            echo "<script>
                alert('✅ Password has been reset successfully!');
                window.location.href='/login.php';
            </script>";
            exit;

        } catch (Exception $e) {
            $error = "Database error: " . htmlspecialchars($e->getMessage());
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password - Shopnoltd Toolbox</title>
<style>
body {
    font-family: Arial, sans-serif;
    background: #f5f5f5;
    padding: 20px;
}
.container {
    max-width: 400px;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.input-group {
    position: relative;
    margin-top: 10px;
}
input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
.toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
    user-select: none;
}
button {
    padding: 10px 15px;
    background: #25D366;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
    width: 100%;
}
.error {
    color: red;
    margin-top: 10px;
}
</style>
</head>
<body>
<div class="container">
    <h2>Reset Password</h2>
    <p>Set a new password for your account (<?php echo htmlspecialchars($user['email']); ?>)</p>

    <?php if (!empty($error)): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>

    <form method="POST">
        <div class="input-group">
            <input type="password" id="password" name="password" placeholder="New Password" required>
            <span class="toggle-password" id="togglePassword1">👁</span>
        </div>
        <div class="input-group">
            <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required>
            <span class="toggle-password" id="togglePassword2">👁</span>
        </div>
        <button type="submit">Reset Password</button>
    </form>
</div>

<script>
// ✅ Toggle password visibility (works on desktop & mobile)
function setupToggle(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);

  function togglePassword(e) {
    e.preventDefault();
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    toggle.textContent = type === 'password' ? '👁' : '🙈';
  }

  // Handle both mouse and touch for mobile browsers
  toggle.addEventListener('click', togglePassword);
  toggle.addEventListener('touchstart', togglePassword);
}

setupToggle('togglePassword1', 'password');
setupToggle('togglePassword2', 'confirm_password');
</script>
</body>
</html>
