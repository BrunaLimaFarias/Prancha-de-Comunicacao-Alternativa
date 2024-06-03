// num sei noq usar


<?php
require_once("../util/db.php");

// Verifica se foi passado o parâmetro 'palavra' na query string
if(isset($_GET['palavra'])) {
    $palavra = $_GET['palavra'];

    // Conecta ao banco de dados
    $conn = conectar_bd();

    // Realiza a consulta para obter as categorias associadas à palavra fornecida
    $query = "SELECT c.nome FROM Categoria c INNER JOIN Dicionario d ON c.idCategoria = d.idCategoria WHERE d.Palavra = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $palavra);
    $stmt->execute();
    $result = $stmt->get_result();

    // Cria um array para armazenar as categorias
    $categorias = array();
    while($row = $result->fetch_assoc()) {
        $categorias[] = $row['nome'];
    }

    // Fecha a conexão com o banco de dados
    $conn->close();

    // Retorna as categorias em formato JSON
    header('Content-Type: application/json');
    echo json_encode($categorias);
} else {
    // Se o parâmetro 'palavra' não foi passado, retorna um erro
    echo json_encode(array("error" => "Parâmetro 'palavra' não fornecido"));
}
?>
