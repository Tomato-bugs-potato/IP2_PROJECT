<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'database.php'; // Assuming database connection is set up

if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    // Prepare SQL query to retrieve user profile data
    $profileStmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $profileStmt->bind_param("i", $userId);
    $profileStmt->execute();
    $profileResult = $profileStmt->get_result();

    if ($profileResult->num_rows > 0) {
        $userData = $profileResult->fetch_assoc();

        $profileData = [
            'name' => $userData['name'],
            'email' => $userData['email'],
            'phone' => $userData['phone'],
            'bio' => $userData['bio'],
            'currJobLocation' => $userData['currJobLocation'],
             'aboutMe' => $userData['aboutMe'],
        ];

        // Query to retrieve user experiences
        $experiencesStmt = $conn->prepare("SELECT * FROM experiences WHERE user_id = ?");
        $experiencesStmt->bind_param("i", $userId);
        $experiencesStmt->execute();
        $experiencesResult = $experiencesStmt->get_result();

        if ($experiencesResult->num_rows > 0) {
            $profileData['experiences'] = $experiencesResult->fetch_all(MYSQLI_ASSOC);
        } else {
            $profileData['experiences'] = [];
        }

        // Query to retrieve user educations
        $educationsStmt = $conn->prepare("SELECT * FROM educations WHERE user_id = ?");
        $educationsStmt->bind_param("i", $userId);
        $educationsStmt->execute();
        $educationsResult = $educationsStmt->get_result();

        if ($educationsResult->num_rows > 0) {
            $profileData['educations'] = $educationsResult->fetch_all(MYSQLI_ASSOC);
        } else {
            $profileData['educations'] = [];
        }

        // Close statements
        $profileStmt->close();
        $experiencesStmt->close();
        $educationsStmt->close();

        // Send the profile data as JSON response
        http_response_code(200);
        echo json_encode($profileData);
    } else {
        // User not found
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
    }
} else {
    // No userId provided
    http_response_code(400);
    echo json_encode(['error' => 'userId parameter is required']);
}
?>