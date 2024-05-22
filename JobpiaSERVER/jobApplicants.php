<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



$host = 'localhost'; // Database host
$dbname = 'jopia_portal'; // Database name
$username = 'root'; // Database username
$password = ''; // Database password

// Create database connection
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


$jobId = $_GET['job_posting_id'];

try {
    $stmt = $pdo->query("SELECT * FROM job_applications WHERE job_posting_id = $jobId");
    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($jobs);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch jobs: ' . $e->getMessage()]);
}
?>
