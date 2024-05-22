<?php
require_once("../util/db.php");

function getFiguras($categoria = '') {
    global $conn;

    if ($categoria) {
        $query = "SELECT * FROM lista_figuras WHERE categoria = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $categoria);
        $stmt->execute();
        $resultado = $stmt->get_result();
    } else {
        $query = "SELECT * FROM lista_figuras";
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

header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON
echo json_encode($figuras);
?>
