<?php
require_once("../util/db.php");


$query = "SELECT * FROM lista_figuras";

$resultado = mysqli_query($con,$query);


$dados = array();

while($registro = mysqli_fetch_assoc($resultado)){
    array_push($dados, $registro);
}

$json = json_encode($dados);
echo $json;


?>