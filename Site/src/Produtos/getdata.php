// teste sem banco

<?php

    $titulo= $_POST['titulo'];

    $preco = "";

    $img = "";
    
    if ($titulo == "Uva"){
        $preco="3.99";
        $img="../img/uva_thompson.jpeg";
    }
    else if ($titulo == "Pera"){
        $preco="2.54";
        $img="../img/pera.jpg";
    }
    else if ($titulo == "Romã"){
        $preco="2.54";
        $img="../img/roma.jpg";
    }
    else if ($titulo == "Tamara"){
        $preco="2.54";
        $img="../img/tamara.jpg";
    }
    else if ($titulo == "Umbu"){
        $preco="2.54";
        $img="../img/umbu.jpg";
    }
    else if ($titulo == "Tamarindo"){
        $preco="2.54";
        $img="../img/pera.jpg";
    }
    
    $json = json_encode($preco);

    echo $json;
?>