<?php
require_once("../connect.php");
$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':


        $getData = "SELECT * FROM `inventory` WHERE `inv_id` = ?";
        $stmt = $dbConn->prepare($getData);
        $stmt->bind_param('i',$_GET['id']);
        $stmt->execute();
        $search_result = $stmt->get_result();
        $stmt->close();        

        



        echo json_encode($search_result->fetch_assoc());





    }
    mysqli_close($dbConn);