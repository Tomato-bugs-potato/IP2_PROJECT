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

try {
    // Create a new PDO instance
    $conn = new PDO("mysql:host=$serverName;dbname=$dbName", $userName, $password);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare SQL statement
    $stmt = $conn->prepare("SELECT * FROM job_postings WHERE id = :id");
    // Bind parameters
    $stmt->bindParam(':id', $jobId);
    // Execute statement
    $stmt->execute();

    // Check if the query was successful
    if ($stmt->rowCount() > 0) {
        // Fetch all rows as associative array
        $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Output job postings data as JSON
        echo json_encode($response);
    } else {
        // Return an error message if no job found
        http_response_code(404);
        echo json_encode(array('message' => 'Job not found'));
    }
} catch (PDOException $e) {
    // Return an error message if connection or query fails
    http_response_code(500);
    echo json_encode(array('message' => 'Error: ' . $e->getMessage()));
}

// Close database connection
$conn = null;
