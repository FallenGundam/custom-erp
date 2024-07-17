<?php

require_once("connect.php");

$dbConn = db_connect();
switch($_SERVER['REQUEST_METHOD'])
{
    case "POST":
        
        $body = file_get_contents('php://input');
        $inputData = json_decode($body, true);

        $username=$inputData['username'];
        $password=$inputData['password'];
        $mail=$inputData['mail'];


        $stmt = mysqli_prepare($dbConn, "SELECT * FROM `user` WHERE `u_name` = ?");
        mysqli_stmt_bind_param($stmt, 's', $username);
        mysqli_stmt_execute($stmt); #執行
        $result = mysqli_stmt_get_result($stmt);
        $stmt->close();

        if ($result->num_rows==0){
            
            $newpass = md5($password); //密碼加密
            $sql="INSERT INTO `user` (`u_id`,`u_name`,`u_password`,`u_mail`) VALUES ( NULL, ?, ?, ?)";
            $stmt2 = $dbConn->prepare($sql);
            $stmt2->bind_param("sss",$username,$newpass,$mail);
            $stmt2->execute();
            $stmt2->close();
        

            $msg = "true";
        }else{
            $msg = "false";
        }
        echo $msg;

        break;

}
mysqli_close($dbConn);		

