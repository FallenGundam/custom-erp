<?php
require_once("../connect.php");

$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $body = file_get_contents('php://input');
        $inputData = json_decode($body, true);

        $status = [
            'status' => false, 
            'msg' => '',
        ];

        $u_id = get_session_uid();
        $search_sql = "SELECT * FROM `inventory` WHERE `inv_name` = ? AND `u_id` = ?";
        $stmt = $dbConn->prepare($search_sql);
        $stmt->bind_param('si',$inputData['name'],$u_id);
        $stmt->execute();
        $search_result = $stmt->get_result();
        $stmt->close();
        if ($search_result->num_rows==0){


            $status['status'] = true;
            $status['msg'] = '新增成功';


            
            $sql = "INSERT INTO `inventory` (`inv_id`, `u_id`, `inv_name`, `inv_model`, `inv_label`, `inv_unlimited`, `inv_price`, `inv_unit`, `inv_remark`, `inv_reg_date`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp());";
            $stmt2 = $dbConn->prepare($sql);
            $stmt2->bind_param("issssiss", $u_id, $inputData['name'], $inputData['model'], $inputData['label'], $inputData['unlimited'], $inputData['price'], $inputData['unit'], $inputData['remark']);

            $stmt2->execute();
            $stmt2->close();
        }else{
            $status['msg'] = '該商品已存在';
        }

        echo json_encode($status);
        break;

}
mysqli_close($dbConn);