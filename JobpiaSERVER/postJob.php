<?php

session_start();
echo "Welcome, " . $_SESSION['id'];


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";




$conn = new mysqli($serverName, $userName, $password, $dbName);


// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Access form data using $_POST superglobal
    $jobTitle = $_POST['jobTitle'];
    $companyName = $_POST['companyName'];
    $minPrice = $_POST['minPrice'];
    $maxPrice = $_POST['maxPrice'];
    $salaryType = $_POST['salaryType'];
    $jobLocation = $_POST['jobLocation'];
    $postingDate = $_POST['postingDate'];
    $experienceLevel = $_POST['experienceLevel'];
    $jobType = $_POST['jobType'];
    $employmentType = $_POST['employmentType'];
    $description = $_POST['description'];
    $userId = $_POST['userId'];


    if (isset($_FILES['companyLogo'])) {
        $file = $_FILES['companyLogo'];
        $fileName = $file['name'];
        $fileTmpName = $file['tmp_name'];
        $fileError = $file['error'];
    
        if ($fileError === UPLOAD_ERR_OK) {
            // Specify upload directory and move the uploaded file
            $uploadDir = 'jobUploads/'; // Directory where files will be saved
            
            // Create the upload directory if it doesn't exist
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true); // Create directory recursively with full permissions
            }

            $uploadPath = $uploadDir . $fileName; // Full path to save the file
            $folder = 'jobUploads/'.$fileName;
            // Move the uploaded file to the specified directory
            if (move_uploaded_file($fileTmpName, $uploadPath)) {
                // File uploaded successfully
                echo "File uploaded successfully!";
            } else {
                // Error moving file
                echo "Error moving uploaded file!";
            }
        } else {
            // Error with file upload
            echo "File upload failed with error code: $fileError";
        }
    } else {
        // No file uploaded
        echo "No file uploaded!";
    }


    $insertSql = "INSERT INTO job_postings (user_id,companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, employmentType, jobType, description) VALUES (?,?, ?, ?,?, ?, ?,?, ?, ?,?, ?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    
    $insertStmt->bind_param("issssssssssss",$userId,$companyName,$jobTitle, $folder, $minPrice, $maxPrice, $salaryType, $jobLocation,$postingDate,$experienceLevel, $employmentType,$jobType, $description);

    if ($insertStmt->execute()) {
        echo "Signup Successfull";
    } else {
        echo "Signup Successfull".$insertStmt->error;
    }
    $insertStmt->close();
} else {
    // Handle if the request method is not POST (e.g., redirect or display error)
    echo "Invalid request method.";
}
?>
