<?php

    $classificar= $_POST['classificar'];

    $msg = "";
    
    if ($classificar == "crescente"){
        $msg="Crescente";
    }
    else if($classificar == "decrescente"){
        $msg="Decrescente";
    }
    else if($classificar == "Maior Preço"){
        $msg="Maior";
    }
    else if($classificar == "Menor Preço"){
        $msg="Menor";
    }
    
    $json = json_encode($msg);

    echo $json;
?>