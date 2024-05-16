<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require_once 'database.php';

// Include your database connection file here if not included already

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $userId = $_POST["userId"];
    $fullName = $_POST["name"];
    $email = $_POST["email"];
    $jobName = $_POST["jobName"];
    $location = $_POST["location"];
    $bio = $_POST["bio"];
    $phone = $_POST["phone"];
    $currJobLocation = $_POST["currJobLocation"];
    $aboutMe = $_POST["aboutMe"];


    // Perform any necessary validation and processing of the form data

    // For demonstration purposes, let's just echo back the form data
    echo "User ID: $userId\n";
    echo "Full Name: $fullName\n";
    echo "Email: $email\n";
    echo "Job Name: $jobName\n";
    echo "Location: $location\n";
    echo "Bio: $bio\n";
    echo "Phone: $phone\n";
    echo "Current Job Location: $currJobLocation\n";
    echo "About Me: $aboutMe\n";
    
    // Update users table with user info
    $sql = "UPDATE users SET name='$fullName', jobName='$jobName', currJobLocation='$location', bio='$bio', phone='$phone', currJobLocation='$currJobLocation', aboutMe='$aboutMe' WHERE id='$userId'";
    if ($conn->query($sql) !== TRUE) {
        echo json_encode(array("success" => false, "error" => "Error updating user info: " . $conn->error));
        exit();
    }



    // Return success response if everything is updated successfully
    echo json_encode(array("success" => true));
} else {
    // Return error response if request method is not POST
    echo json_encode(array("success" => false, "error" => "Invalid request"));
}

// Close database connection
$conn->close();
?>
