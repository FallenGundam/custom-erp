<?php
require_once("../connect.php");
$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':

        $u_id = get_session_uid();
        if ($_GET['key']==''){
            $getAllData = "SELECT * FROM `inventory` WHERE `u_id` = ?";
            $stmt = $dbConn->prepare($getAllData);
            $stmt->bind_param('i',$u_id);
        }else {
            $getAllData = "SELECT * FROM `inventory` WHERE `u_id` = ? AND `inv_name` LIKE ?";
            $stmt = $dbConn->prepare($getAllData);
            $key = '%'.$_GET['key'].'%';
            $stmt->bind_param('is',$u_id,$key);
        }

        $stmt->execute();
        $search_result = $stmt->get_result();
        $stmt->close();        

        
        $temp_data = [];

        foreach ($search_result->fetch_all(MYSQLI_ASSOC) as $key => $value) {
            

            $stats = '是';
            if($value['inv_amount']==0){
                $stats='否';
                if ($value['inv_unlimited']){
                    $stats='是';
                }
            }
            
            $temp_data[$key] = [
                'id' => $value['inv_id'],
                'name' => $value['inv_name'],
                'model' => $value['inv_model'],
                'label' => $value['inv_label'],
                'price' => $value['inv_price'],
                'amount' => $value['inv_amount'],
                'stats' => $stats,
            ];
        }



        echo json_encode($temp_data);










    }
    mysqli_close($dbConn);