<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'database.php'; // Assuming database connection is set up

// Check if userId is provided via GET request
if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    // Prepare SQL statement with parameterized query
    $sql = "SELECT profilePicture, coverPicture FROM users WHERE id = ?";
    
    // Use prepared statement to avoid SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch profile and cover picture URLs
        $row = $result->fetch_assoc();
        $profilePictureURL = $row['profilePicture'];
        $coverPictureURL = $row['coverPicture'];

        // Construct JSON response
        $response = [
            'success' => true,
            'profilePictureURL' => $profilePictureURL,
            'coverPictureURL' => $coverPictureURL
        ];

        // Output JSON response
        echo json_encode($response);
    } else {
        // User not found
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }

    // Close prepared statement
    $stmt->close();
} else {
    // userId not provided in request
    echo json_encode(['success' => false, 'message' => 'User ID not provided']);
}

// Close database connection
$conn->close();

?>
