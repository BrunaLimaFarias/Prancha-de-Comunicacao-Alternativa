<?php
require_once("../util/db.php");

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $titulo = $_POST["titulo"];
    $categorias = explode(",", $_POST["categorias"]);
    
    // Constrói o caminho da imagem com base no título da figura
    $img = "./img/figuras/" . str_replace(' ', '_', strtolower($titulo)) . ".jpg";
    
    // Adiciona a figura e suas categorias ao banco de dados
    adicionarFiguraACategorias($titulo, $img, $categorias);
} else {
    // Redireciona para a página do formulário se não houver dados enviados
    header("Location: ./util/add_figuras.php");
    exit;
}
?>
