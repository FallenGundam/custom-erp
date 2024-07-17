<?php

    require_once("connect.php");
    $dbConn = db_connect();
    switch($_SERVER['REQUEST_METHOD'])
    {
        case "POST":
            
            $body = file_get_contents('php://input');
            $inputData = json_decode($body, true);
    
            $username=$inputData['username'];
            $password=md5($inputData['password']);



            if (strstr($username, '@')){
                $sqltmp = "SELECT * FROM `user` WHERE `u_mail` = ?";
            }else{
                $sqltmp = "SELECT * FROM `user` WHERE `u_name` = ?";
            }

            $namesearch_sql = mysqli_prepare($dbConn,$sqltmp);
            mysqli_stmt_bind_param($namesearch_sql, 's', $username);
            mysqli_stmt_execute($namesearch_sql); #執行
            $result = mysqli_stmt_get_result($namesearch_sql);
        

            $msg = [
                "error_msg" => "",
                "active" => false,
                "session_id" => "",
                "u_id"=>"",
                "u_name"=>""
            ];

            if ($result->num_rows > 0){
                $data = $result->fetch_array(MYSQLI_ASSOC);
                //登入成功
                if ($password == $data['u_password']){
                    session_start();
                    $_SESSION['u_id'] = $data['u_id'];
                    $msg['active'] = true;
                    $msg['session_id'] = session_id();
                    $msg['u_id'] = $data['u_id'];
                    $msg['u_name'] = $data['u_name'];
                }else{
                    $msg['error_msg'] = "密碼錯誤";
                }


            }else{
                $msg['error_msg'] = "該帳號不存在";
            }
            $namesearch_sql->close();
            echo json_encode($msg);
        
    }
    mysqli_close($dbConn);