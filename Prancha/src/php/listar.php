<?php
require_once("../util/db.php");

function getFiguras($categoria = '') {
    // Conecta ao banco de dados
    $conn = conectar_bd();

    if ($categoria) {
        $query = "
            SELECT lista_figuras.titulo, lista_figuras.img 
            FROM lista_figuras 
            JOIN figura_categoria ON lista_figuras.id = figura_categoria.figura_id 
            JOIN categorias ON figura_categoria.categoria_id = categorias.id 
            WHERE categorias.nome = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $categoria);
        $stmt->execute();
        $resultado = $stmt->get_result();
    } else {
        $query = "SELECT titulo, img FROM lista_figuras";
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

// Logs de depuração
error_log("Categoria: $categoria");
error_log("Figuras retornadas: " . json_encode($figuras));

header('Content-Type: application/json');
echo json_encode($figuras);
?>
