<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";


$conn = new mysqli($serverName, $userName, $password, $dbName);

// Retrieve the data from the request body
$data = json_decode(file_get_contents('php://input'), true);
$oldPassword = $data['oldPassword'];
$newPassword = $data['newPassword'];

// Perform password change logic
if (!empty($oldPassword) && !empty($newPassword)) {
    // Retrieve the user's current password from the database
    $id = $_GET['userId'];
    $sql = "SELECT password FROM users WHERE id = $id";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $password_hash = $row['password'];

        // Verify if the old password matches the stored password
        if (password_verify($oldPassword, $password_hash)) {
            // Generate a new password hash
            $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
            
            // Update the user's password in the database
            $updateSql = "UPDATE users SET password = '$newPasswordHash' WHERE id = $id";
            if ($conn->query($updateSql) === TRUE) {
                // Password changed successfully
                echo json_encode(['success' => true, 'message' => 'Password changed successfully']);
            } else {
                // Error updating the password
                echo json_encode(['success' => false, 'message' => 'Error updating the password']);
            }
        } else {
            // Incorrect old password
            echo json_encode(['success' => false, 'message' => 'Incorrect old password']);
        }
    } else {
        // User not found
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} else {
    // Missing required fields
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
}

?>
