<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


session_start();
var_dump($_SESSION['email']);


error_reporting(E_ALL);
ini_set('display_errors', 0); // Turn off display errors
ini_set('log_errors', 1); // Turn on log errors
ini_set('error_log', '/path/to/your/error.log'); // Log file path

// Check if user is logged in
if (isset($_SESSION['email'])) {
    // Destroy session data
    session_destroy();
    // Send JSON response indicating successful logout
    echo json_encode(['success' => true]);
} else {
    // Send JSON response indicating failure (if user not logged in)
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
?>
