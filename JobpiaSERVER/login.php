<?php


session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");


error_reporting(E_ALL);
ini_set('display_errors', 1);


$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";


$conn = new mysqli($serverName, $userName, $password, $dbName);

function createResponse($status, $message, $data = [])
{
    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data
    ];
    return json_encode($response);
}

// Processing API requests
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data) {

        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        if (empty($email) || empty($password)) {
            echo createResponse('error', 'Missing required fields.', []);
            exit;
        }

        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $password_hash = $row['password'];
            $user_id = $row['id'];

            if (password_verify($password, $password_hash)) {

                // Authentication successful
                $user = array(
                    'id' => $user_id,
                    'email' => $email,
                    'password' => $password
                );
                
                $_SESSION['id'] = $row['id'];
                $_SESSION['email'] = $row['email'];
                $_SESSION['user_id'] =$row['id'];
                $id = $_SESSION['id'];
                echo createResponse('success', 'Login successful.', $user);
                
            } else {
               
            echo createResponse('error', 'Incorrect login information.', []);
             exit;
            }
        } else {
            // User not found
            echo createResponse('error', 'User not found.', []);
            exit;
        }
    } else {
        echo createResponse('error', 'Wrong request.', []);
        exit;
    }
    
}

?>