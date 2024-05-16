<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



$userId = $_GET['userId'];

try {
    $stmt = $pdo->query("SELECT * FROM users WHERE id = $userId");
    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($jobs);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch jobs: ' . $e->getMessage()]);
}

?>