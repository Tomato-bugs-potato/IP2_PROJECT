<?php
session_start();

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
