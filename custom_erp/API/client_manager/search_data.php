<?php
require_once("../connect.php");
$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $u_id = get_session_uid();
        if ($_GET['key']==''){
            $getAllData = "SELECT * FROM `client_data` WHERE `u_id` = ?";
            $stmt = $dbConn->prepare($getAllData);
            $stmt->bind_param('i',$u_id);
        }else {
            $getAllData = "SELECT * FROM `client_data` WHERE `u_id` = ? AND `c_name` LIKE ?";
            $stmt = $dbConn->prepare($getAllData);
            $key = '%'.$_GET['key'].'%';
            $stmt->bind_param('is',$u_id,$key);
        }

        $stmt->execute();
        $search_result = $stmt->get_result();
        $stmt->close();        

        
        $temp_data = [];

        foreach ($search_result->fetch_all(MYSQLI_ASSOC) as $key => $value) {
            

            $temp_data[$key] = [
                'c_id' => $value['c_id'],
                'c_name' => $value['c_name'],
                'c_mail' => $value['c_mail'],
                'c_phone' => $value['c_phone'],
            ];
        }



        echo json_encode($temp_data);










    }
    mysqli_close($dbConn);