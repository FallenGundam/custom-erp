<?php
require_once("../connect.php");
$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'PATCH':
        $body = file_get_contents('php://input');
        $inputData = json_decode($body, true);

        $update_sql = "UPDATE `client_data` SET `c_name` = ?, `c_locate` = ?, `c_phone` = ?, c_telephone = ?, c_fax = ?, c_mail = ?, c_birthday = ? , c_url = ? , c_remark = ? ,`c_gender` = ?, c_company = ? WHERE `client_data`.`c_id` = ?";
        $stmt = $dbConn->prepare($update_sql);
        $stmt->bind_param('sssssssssssi',$inputData['name'],$inputData['locate'],$inputData['phone'],$inputData['telephone'],$inputData['fax'],$inputData['mail'],$inputData['birthday'],$inputData['url'],$inputData['remark'],$inputData['gender'],$inputData['company'],$inputData['c_id']);
        $stmt->execute();
    
    
    
    }
        