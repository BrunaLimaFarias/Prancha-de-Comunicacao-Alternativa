<?php
require_once("../util/db.php");

// Função para obter todas as categorias do banco de dados
function obterCategorias() {
    $conn = conectar_bd();
    $sql = "SELECT nome FROM categorias";
    $result = $conn->query($sql);

    $categorias = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $categorias[] = $row['nome'];
        }
    }

    $conn->close();

    return $categorias;
}

// Obtém as categorias
$categorias = obterCategorias();

// Retorna as categorias no formato JSON
header('Content-Type: application/json');
echo json_encode($categorias);
?>
