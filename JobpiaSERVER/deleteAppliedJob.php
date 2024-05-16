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


$jobId = $_GET['jobId'];

try {
    $stmt = $pdo->query("DELETE FROM job_applications WHERE id = $jobId");
    echo json_encode(['acknowledged' => true]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to delete job: ' . $e->getMessage()]);
}
?>
