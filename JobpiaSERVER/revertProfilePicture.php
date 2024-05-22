<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$host = 'localhost'; // Database host
$dbname = 'jopia_portal'; // Database name
$username = 'root'; // Database username
$password = ''; // Database password


try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Get the form data
$userId = $_POST['userId'];
$profileUrl = $_POST['profileUrl'];

// Debugging: Dump the received form data

try {
    // Prepare the SQL statement
    $stmt = $pdo->prepare('UPDATE users SET profilePicture = :profileUrl WHERE id = :userId');
    // Execute the statement with bound parameters
    $stmt->execute(['profileUrl' => $profileUrl, 'userId' => $userId]);

    if ($stmt->rowCount()) {
        echo json_encode(['success' => true, 'message' => 'Profile picture updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No rows affected, user might not exist']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>