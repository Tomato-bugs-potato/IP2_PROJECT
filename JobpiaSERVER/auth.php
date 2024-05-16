<?php

require_once 'login.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $passedEmail = $_POST['email'];
    $password = $_POST['password'];

    $check = "SELECT * FROM users WHERE email = ?";
    $checkstmt = $conn -> prepare($check);
    $checkstmt->bind_param("s",$passedEmail);
    $checkstmt->execute();
    $checkResult = $checkstmt->get_result();

    if ($checkResult->num_rows > 0) {
        // Email exists, now check password
        $user = $checkResult->fetch_assoc();
        $hashedPasswordFromDB = $user['password'];
        $userIdd = $user['id'];

        if (password_verify($password, $hashedPasswordFromDB)) {
            // Password is correct, provide user ID
            echo "User ID: $userIdd";
        } else {
            // Incorrect password
            echo "Incorrect password";
        }
    } else {
        // Email not found in database
        echo "Email not registered";
    }
    
    
// Assuming $user_id is obtained from auth.php
  
}

    


?>