<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $name = $email = $password = "";
        $nameErr = $emailErr = $passErr = "";

        if($_SERVER["REQUEST_METHOD"]=="POST") {
            if (empty($_POST["name"])) {
                $nameErr= "Name is empty";
            } else {
                $name= $_POST["name"];
                $nameErr = "";
            }

            if (empty($_POST["email"])) {
                $emailErr= "email is empty";
            } else {
                $email= $_POST["email"];
            }

            if (empty($_POST["password"])) {
                $passErr= "password is empty";
            } else {
                $password= $_POST["password"];
            }
        }
    ?>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        Full Name: <input type="text" name="name">
        <span>*<?php echo $nameErr,$name?></span>
        <br><br>
        Email: <input type="email" name="email">
        <span>*<?php echo $emailErr,$email?></span>
        <br><br>
        password: <input type="text" name="password">
        <span>*<?php echo $passErr, $password?></span>
        <br><br>
        <input type="submit">
    </form>
</body>
</html>