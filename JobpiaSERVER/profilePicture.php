<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'database.php';


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["profilePicture"]) && isset($_POST["userId"])) {
    $userId = $_POST["userId"];
 
    $file = $_FILES['profilePicture'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileError = $file['error'];

    if ($fileError === UPLOAD_ERR_OK) {
        // Specify upload directory and move the uploaded file
        $uploadDir = 'C://Users//HP 15//OneDrive//Desktop//Semister Course//React_PHP//job_portal//public//images//'; // Directory where files will be saved
        
        // Create the upload directory if it doesn't exist
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create directory recursively with full permissions
        }

        $uploadPath = $uploadDir . $fileName; // Full path to save the file
        $folder = 'images/'.$fileName;
        // Move the uploaded file to the specified directory
        if (move_uploaded_file($fileTmpName, $uploadPath)) {
            // File uploaded successfully
            echo "File uploaded successfully!";
        } else {
            // Error moving file
            echo "Error moving uploaded file!";
        }
    } 
 
    else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload profile picture']);
    }


} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}

 
$sql = "UPDATE users SET profilePicture = '$folder' WHERE id = $userId";
if ($conn->query($sql) === TRUE) {
    $insertHistorySql = "INSERT INTO profile_picture_history (user_id, profilePicture) VALUES ($userId, '$folder')";
    if ($conn->query($insertHistorySql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Profile picture uploaded and history updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update profile picture history']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update profile picture']);
}

$conn->close();
?>
