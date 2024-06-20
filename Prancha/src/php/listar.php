<?php
require_once("../util/db.php");

function getFiguras($categoria = '') {
    // Conecta ao banco de dados
    $conn = conectar_bd();

    if ($categoria) {
        $query = "
            SELECT lista_figuras.palavra, lista_figuras.img 
            FROM lista_figuras 
            JOIN figura_categoria ON lista_figuras.id = figura_categoria.figura_id 
            JOIN categorias ON figura_categoria.categoria_id = categorias.id 
            WHERE categorias.nome = ?";
         /*
        $query = "
            SELECT lf.id, lf.palavra, lf.img, GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias
            FROM lista_figuras lf
            JOIN figura_categoria fc ON lf.id = fc.figura_id
            JOIN categorias c ON fc.categoria_id = c.id
            WHERE c.nome = ?
            GROUP BY lf.id, lf.palavra, lf.img
        ";
         */
        $stmt = $conn->prepare($query);
        if ($stmt === false) {
            die("Erro na preparação da consulta: " . $conn->error);
        }
        $stmt->bind_param("s", $categoria);
        $stmt->execute();
        $resultado = $stmt->get_result();
    } else {
        $query = "SELECT palavra, img FROM lista_figuras";
        /*
        $query = "
            SELECT lf.id, lf.palavra, lf.img, GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias
            FROM lista_figuras lf
            LEFT JOIN figura_categoria fc ON lf.id = fc.figura_id
            LEFT JOIN categorias c ON fc.categoria_id = c.id
            GROUP BY lf.id, lf.palavra, lf.img
        ";
        */
        $resultado = $conn->query($query);
    }

    if (!$resultado) {
        die("Erro ao executar a consulta: " . $conn->error);
    }

    $figuras = array();
    while ($row = $resultado->fetch_assoc()) {
        $figuras[] = $row;
    }

    return $figuras;
}

$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : '';
$figuras = getFiguras($categoria);

// Logs de depuração detalhados
error_log("Categoria: $categoria");
error_log("Número de figuras retornadas: " . count($figuras));
foreach ($figuras as $figura) {
    error_log("Figura: " . json_encode($figura));
}

header('Content-Type: application/json');
echo json_encode($figuras);
?>
