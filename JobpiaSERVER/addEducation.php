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
$uniName = $_POST['uniName'];
$degreeLevel = $_POST['degreeLevel'];
$field = $_POST['field'];
$startYear = $_POST['startYear'];
$endYear = $_POST['endYear'];
$description = $_POST['description'];

// SQL query to insert new education record into the database
$sql = "INSERT INTO educations (user_id,uniName, degreeLevel, field, startYear, endYear, description)
        VALUES ($userId,'$uniName', '$degreeLevel', '$field', '$startYear', '$endYear', '$description')";

if ($conn->query($sql) === TRUE) {
    echo "New education record added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
