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
        /*
        $query = "
            SELECT lf.id, lf.titulo, lf.img, GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias, GROUP_CONCAT(p.palavra SEPARATOR ', ') AS palavras
            FROM lista_figuras lf
            JOIN figura_categoria fc ON lf.id = fc.figura_id
            JOIN categorias c ON fc.categoria_id = c.id
            LEFT JOIN figura_palavra fp ON lf.id = fp.figura_id
            LEFT JOIN palavras p ON fp.palavra_id = p.id
            WHERE c.nome = ?
            GROUP BY lf.id, lf.titulo, lf.img
        ";
         */
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $categoria);
        $stmt->execute();
        $resultado = $stmt->get_result();
    } else {
        $query = "SELECT titulo, img FROM lista_figuras";
        /*
        $query = "
            SELECT lf.id, lf.titulo, lf.img, GROUP_CONCAT(DISTINCT c.nome SEPARATOR ', ') AS categorias, GROUP_CONCAT(DISTINCT p.palavra SEPARATOR ', ') AS palavras
            FROM lista_figuras lf
            LEFT JOIN figura_categoria fc ON lf.id = fc.figura_id
            LEFT JOIN categorias c ON fc.categoria_id = c.id
            LEFT JOIN figura_palavra fp ON lf.id = fp.figura_id
            LEFT JOIN palavras p ON fp.palavra_id = p.id
            GROUP BY lf.id, lf.titulo, lf.img
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

// Logs de depuração
error_log("Categoria: $categoria");
error_log("Figuras retornadas: " . json_encode($figuras));

header('Content-Type: application/json');
echo json_encode($figuras);
?>
