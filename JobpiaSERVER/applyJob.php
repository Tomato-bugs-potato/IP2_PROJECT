<?php

session_start();
echo "Welcome, " . $_SESSION['id'];


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";


$conn = new mysqli($serverName, $userName, $password, $dbName);

$jobId = $_GET['jobId'];

echo $jobId;

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Access form data using $_POST superglobal
    $userId = $_POST['user_id'];
    $jobPostingId = $_POST['job_posting_id'];
    $fullName = $_POST['fullName'];
    $currEmployment = $_POST['currEmployment'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $postingDate = $_POST['applicationDate'];
    $experienceLevel = $_POST['experienceLevel'];
    $description = $_POST['description'];


    $insertSql = "INSERT INTO job_applications (user_id,job_posting_id, fullName, currEmployment, email, phone, experienceLevel, description, applicationDate) VALUES (?,?, ?, ?,?, ?, ?,?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    
    $insertStmt->bind_param("iisssssss",$userId,$jobId,$fullName, $currEmployment, $email, $phone,$experienceLevel, $description,$postingDate,);

    if ($insertStmt->execute()) {
        echo "Signup Successfull";
    } else {
        echo "Signup Successfull".$insertStmt->error;
    }
    $insertStmt->close();
} else {
    // Handle if the request method is not POST (e.g., redirect or display error)
    echo "Invalid request method.";
}
?>
