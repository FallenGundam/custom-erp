<?php

require_once("connect.php");

$dbConn = db_connect();
switch($_SERVER['REQUEST_METHOD'])
{
    case "POST":
        $body = file_get_contents('php://input');
        $inputData = json_decode($body, true);

        $session_id = $inputData['session_id'];        
        $u_id = $inputData['u_id'];  

        
        $msg = [
            "message" => "",
            "status" => true
        ];

        session_start();
        //無登入
        if (!array_key_exists('u_id',$_SESSION)) {
            $msg['message'] = "未找到session";
            $msg['status'] = false;
            session_unset();
        //已登入 驗證cookie是否被竄改
        } else {
            if ($session_id == session_id() && $u_id == $_SESSION['u_id']){
                $msg['message'] = "驗證成功";               
            }else{
                $msg['message'] = "驗證失敗";
                $msg['status'] = false;
                session_unset();
            }
        }
        echo json_encode($msg);
    
    
    
    
}

