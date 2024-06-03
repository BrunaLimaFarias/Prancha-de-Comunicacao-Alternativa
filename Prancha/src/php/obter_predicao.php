<?php
require_once("../util/db.php");

// Verifica se foi passado o parâmetro 'palavra' na query string
if(isset($_GET['palavra'])) {
    $palavra = $_GET['palavra'];

    // Conecta ao banco de dados
    $conn = conectar_bd();

    // Realiza a consulta para obter a lista de palavras (títulos de figuras) que começam com a palavra fornecida
    $query = "SELECT palavra FROM lista_figuras WHERE palavra LIKE ? LIMIT 10"; // Limite de 10 resultados
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $palavra);
    $stmt->execute();
    $result = $stmt->get_result();

    // Cria um array para armazenar os resultados
    $predicao = array();
    while($row = $result->fetch_assoc()) {
        $predicao[] = $row['palavra'];
    }

    // Fecha a conexão com o banco de dados
    $conn->close();

    // Retorna os resultados em formato JSON
    header('Content-Type: application/json');
    echo json_encode($predicao);
} else {
    // Se o parâmetro 'palavra' não foi passado, retorna um erro
    echo json_encode(array("error" => "Parâmetro 'palavra' não fornecido"));
}
?>
