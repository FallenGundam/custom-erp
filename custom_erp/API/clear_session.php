<?php

    session_start();
    if (array_key_exists('u_id',$_SESSION)){
        echo "刪除session";
        session_unset();
    }else{
        echo "session不存在";
    }





    