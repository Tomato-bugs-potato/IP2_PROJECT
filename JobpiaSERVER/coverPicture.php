<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'database.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["coverPicture"]) && isset($_POST["userId"])) {
    $userId = $_POST["userId"];


    $file = $_FILES['coverPicture'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileError = $file['error'];

    if ($fileError === UPLOAD_ERR_OK) {
        // Specify upload directory and move the uploaded file
        $uploadDir = 'uploads/'; // Directory where files will be saved
        
        // Create the upload directory if it doesn't exist
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create directory recursively with full permissions
        }

        $uploadPath = $uploadDir . $fileName; // Full path to save the file
        $folder = 'uploads/'.$fileName;
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
        echo json_encode(['success' => false, 'message' => 'Failed to upload cover picture']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}

$sql = "UPDATE users SET coverPicture = '$folder' WHERE id = $userId";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Cover picture uploaded successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update cover picture']);
}

$conn->close();
?>
