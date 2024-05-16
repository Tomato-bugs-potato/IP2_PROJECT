<?php
// Set headers to allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Include your database connection file

// Assuming you have a function to establish database connection


$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";




$conn = new mysqli($serverName, $userName, $password, $dbName);



// Check if userId is provided in the request query string
if (isset($_GET['userId'])) {
    $userId = $_GET['userId'];


   // Fetch applied jobs data for the specified user ID
        $sql = "SELECT ja.*, jp.companyName, jp.jobTitle, jp.minPrice, jp.maxPrice
        FROM job_applications ja
        JOIN job_postings jp ON ja.job_posting_id = jp.id
        WHERE ja.user_id = $userId";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $appliedJobs = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($appliedJobs);
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to fetch applied jobs'));
    }
} else {
    http_response_code(400);
    echo json_encode(array('message' => 'User ID not provided'));
}

// Close the database connection
mysqli_close($conn);
?>
