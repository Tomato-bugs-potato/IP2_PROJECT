<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'database.php'; // Assuming database connection is set up

// Function to delete an experience by ID
function deleteExperience($conn, $experienceId) {
    $stmt = $conn->prepare("DELETE FROM experiences WHERE id = ?");
    $stmt->bind_param("i", $experienceId);
    $stmt->execute();
    $stmt->close();
}

// Function to delete an education by ID
function deleteEducation($conn, $educationId) {
    $stmt = $conn->prepare("DELETE FROM educations WHERE id = ?");
    $stmt->bind_param("i", $educationId);
    $stmt->execute();
    $stmt->close();
}

// Handle DELETE requests
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Check if experience ID is provided
    if (isset($_GET['experienceId'])) {
        $experienceId = $_GET['experienceId'];
        deleteExperience($conn, $experienceId);
        echo json_encode(['success' => true, 'message' => 'Experience deleted successfully']);
    } else {
        // No ID provided
        http_response_code(400);
        echo json_encode(['error' => 'Experience ID parameter is required']);
    }
} else {
    // Method not allowed
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

?>
