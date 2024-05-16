<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


require_once 'database.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $check = "SELECT * FROM users WHERE email = ?";
    $checkstmt = $conn -> prepare($check);
    $checkstmt->bind_param("s",$email);
    $checkstmt->execute();
    $checkResult = $checkstmt->get_result();

    if($checkResult-> num_rows > 0) {
        echo "Email already registered";
    } else {
        $insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";
        $insertStmt = $conn->prepare($insertSql);
        
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $insertStmt->bind_param("ss", $email, $hashed_password);

        if ($insertStmt->execute()) {
            echo "Signup Successfull";
        } else {
            echo "Signup Successfull".$insertStmt->error;
        }
        $insertStmt->close();
    }

    $checkstmt->close();
}
  
closeConnection();
?>