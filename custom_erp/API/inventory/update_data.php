<?php
require_once("../connect.php");
$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'PATCH':
        $body = file_get_contents('php://input');
        $inputData = json_decode($body, true);




        $update_sql = "UPDATE `inventory` SET `inv_name` = ?, `inv_model` = ?, `inv_label` = ?, inv_unlimited = ?, inv_price = ?, inv_unit = ?, inv_remark = ? WHERE `inventory`.`inv_id` = ?";
        $stmt = $dbConn->prepare($update_sql);
        $stmt->bind_param('ssssissi',$inputData['name'],$inputData['model'],$inputData['label'],$inputData['unlimited'],$inputData['price'],$inputData['unit'],$inputData['remark'],$inputData['id']);
        $stmt->execute();
    
    
    
    }
        