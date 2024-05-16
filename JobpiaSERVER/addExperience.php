<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require_once 'database.php';
// Create connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve education data from POST request
$userId = $_POST['userId'];
$jobName = $_POST['jobName'];
$jobType = $_POST['jobType'];
$startYear = $_POST['startYear'];
$endYear = $_POST['endYear'];
$jobLocation = $_POST['jobLocation'];
$description = $_POST['description'];
        

// SQL query to insert new education record into the database
$sql = "INSERT INTO experiences (user_id,jobName, jobType, jobLocation, startYear, endYear, description)
        VALUES ($userId,'$jobName', '$jobType', '$jobLocation', '$startYear', '$endYear', '$description')";

if ($conn->query($sql) === TRUE) {
    echo "New experience record added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
