<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
session_start();



$jobId = $_GET['jobId'];

// Include database connection code or initialize connection variables

// Assuming you have already included database connection code

$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";

$conn = new mysqli($serverName, $userName, $password, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = array(); // Initialize response array

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Access form data using $_POST superglobal

    // Retrieve other form data
    $jobTitle = $_POST['jobTitle'];
    $companyName = $_POST['companyName'];
    $minPrice = $_POST['minPrice'];
    $maxPrice = $_POST['maxPrice'];
    
    // Retrieve other form data as needed...

    // Update the job posting in the database
    $updateSql = "UPDATE job_postings SET jobTitle=?, companyName=?, minPrice=?, maxPrice=? WHERE id=?";
    $updateStmt = $conn->prepare($updateSql);

    // Bind parameters
    $updateStmt->bind_param("ssiii", $jobTitle, $companyName, $minPrice, $maxPrice, $jobId);

    if ($updateStmt->execute()) {
        // Job posting updated successfully
        $response['success'] = true;
        $response['message'] = "Job updated successfully!";
    } else {
        // Error updating job posting
        $response['success'] = false;
        $response['message'] = "Error updating job!";
    }
    $updateStmt->close();
} 

// Close database connection
$conn->close();

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>
