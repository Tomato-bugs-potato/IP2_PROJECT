<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";

// Create connection
$conn = new mysqli($serverName, $userName, $password, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to retrieve job postings data including company logo file path
$sql = "SELECT * FROM job_postings";
$result = $conn->query($sql);

// Array to hold job postings data
$jobPostings = [];

// Check if there are any rows returned from the query
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        // Build job posting object
        $jobPosting = [
            "_id" => $row["id"],
            "jobTitle" => $row["jobTitle"],
            "companyName" => $row["companyName"],
            "minPrice" => $row["minPrice"],
            "maxPrice" => $row["maxPrice"],
            "salaryType" => $row["salaryType"],
            "jobLocation" => $row["jobLocation"],
            "postingDate" => $row["postingDate"],
            "experienceLevel" => $row["experienceLevel"],
            "employmentType" => $row["employmentType"],
            "jobType" => $row["jobType"],
            "description" => $row["description"],
            "companyLogo" => $row["companyLogo"]
        ];

        // Push job posting object into the array
        $jobPostings[] = $jobPosting;
    }

    // Output job postings data as JSON
    echo json_encode($jobPostings);
} else {
    // No job postings found
    echo json_encode([]);
}

// Close the database connection
$conn->close();
?>
