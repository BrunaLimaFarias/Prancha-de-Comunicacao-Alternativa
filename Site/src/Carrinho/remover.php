<?php
    require_once("../../util/db.php");
    //chama banco

    $id = $_POST["id"];
    global $conn;
    
    $query_carrinho = "DELETE FROM carrinho WHERE id_produto = $id";
    mysqli_query($conn, $query_carrinho);    
    
    $query = "DELETE FROM produtos WHERE id = '$id'";   
    mysqli_query($conn, $query); 
?>

