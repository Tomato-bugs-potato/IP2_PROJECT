<?php


$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "jopia_portal";


$conn = new mysqli($serverName, $userName, $password, $dbName);


if ($conn -> connect_error) {
    die("Connection failed: ".$conn->connect_error);

}

function executeQuery($sql) {
    global $conn;
    $result = $conn->query($sql);

    if($result === false) {
        echo "Error executing query: ".$conn->error;
        return false;
    }

    return $result;
}

function closeConnection() {
    global $conn;
    $conn->close();
}

?>