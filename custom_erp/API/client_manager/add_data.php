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
        $search_sql = "SELECT * FROM `client_data` WHERE `c_name` = ? AND `u_id` = ?";
        $stmt = $dbConn->prepare($search_sql);
        $stmt->bind_param('si',$inputData['name'],$u_id);
        $stmt->execute();
        $search_result = $stmt->get_result();
        $stmt->close();
        if ($search_result->num_rows==0){


            $status['status'] = true;
            $status['msg'] = '新增成功';

            
            $sql = "INSERT INTO `client_data` (`c_id`, `c_name`, `c_locate`, `c_other_id`, `c_phone`, `c_telephone`, `c_fax`, `c_mail`, `c_birthday`, `c_url`, `c_remark`, `c_gender`, `c_reg_date`, `c_company`,`u_id`) VALUES (NULL, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp(), ?, ?);";
            $stmt2 = $dbConn->prepare($sql);
            $stmt2->bind_param("sssssssssssi", $inputData['name'], $inputData['locate'], $inputData['phone'], $inputData['telephone'], $inputData['fax'], $inputData['mail'], $inputData['birthday'], $inputData['url'], $inputData['remark'], $inputData['gender'], $inputData['company'],$u_id);

            $stmt2->execute();
            $stmt2->close();
        }else{
            $status['msg'] = '該客戶名稱已存在';
        }

        echo json_encode($status);
        break;

}
mysqli_close($dbConn);