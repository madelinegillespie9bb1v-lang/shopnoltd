<?php
session_start();
require_once __DIR__ . '/../../config.php';
if (!isset($_SESSION['user'])) { header('Location: ../../accounts/login/index.php'); exit; }
echo "<h2>Transfer Fund</h2><p>Feature coming soon.</p>";
