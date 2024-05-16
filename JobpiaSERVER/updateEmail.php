<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");



$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";


$conn = new mysqli($serverName, $userName, $password, $dbName);

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$id = $_GET['userId'];
echo $email;

// Update users table with user info
$sql = "UPDATE users SET  email='$email' WHERE id='$id'";
if ($conn->query($sql) !== TRUE) {
    echo json_encode(array("success" => false, "error" => "Error updating user info: " . $conn->error));
    exit();
}

?>
