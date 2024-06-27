<?php
require_once("../util/db.php");

// Função para obter todas as categorias do banco de dados
function obterCategorias() {
    $conn = conectar_bd();
    $sql = "SELECT c.nome, COUNT(fc.figura_id) as count 
            FROM categorias c
            LEFT JOIN figura_categoria fc ON c.id = fc.categoria_id
            GROUP BY c.nome";
    /*
    $query = "
            SELECT lista_figuras.palavra, lista_figuras.img 
            FROM lista_figuras 
            JOIN figura_categoria ON lista_figuras.id = figura_categoria.figura_id 
            JOIN categorias ON figura_categoria.categoria_id = categorias.id 
            WHERE categorias.nome = ?";
            */
    $result = $conn->query($sql);

    $categorias = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $categorias[$row['nome']] = (int)$row['count'];
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
