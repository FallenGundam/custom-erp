<?php
require_once("../connect.php");
$dbConn = db_connect();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'DELETE':
        


        $search_sql = "DELETE FROM `inventory` WHERE `inventory`.`inv_id` = ?";
        $stmt = $dbConn->prepare($search_sql);
        $stmt->bind_param('i',$_GET['id']);
        $stmt->execute();
        $search_result = $stmt->get_result();
        $stmt->close();



    
    
    }