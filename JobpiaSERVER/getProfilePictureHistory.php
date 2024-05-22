<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'database.php';

if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["userId"])) {
    $userId = $_GET["userId"];

    $sql = "SELECT profilePicture FROM profile_picture_history WHERE user_id = $userId ORDER BY timestamp DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $history = [];
        while($row = $result->fetch_assoc()) {
            $history[] = $row;
        }
        echo json_encode($history);
    } else {
        echo json_encode([]);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}

$conn->close();
?>
