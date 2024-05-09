<?php
require_once("../util/db.php");

function getFiguras() {
    global $conn;
    $query = "SELECT * FROM lista_figuras";
    $resultado = $conn->query($query);

    $figuras = array();
    while ($row = $resultado->fetch_assoc()) {
        $figuras[] = $row;
    }

    return $figuras;
}

header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON
echo json_encode(getFiguras());
?>
