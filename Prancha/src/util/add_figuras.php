<?php
// add_figuras.php

require_once("../util/add_figure_to_category.php");

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    if (isset($_POST["titulo"]) && isset($_POST["categorias"])) {
        $titulo = $_POST["titulo"];
        $categorias = explode(",", $_POST["categorias"]);

        // Constrói o caminho da imagem com base no título da figura
        $img = "./img/figuras/" . str_replace(' ', '_', strtolower($titulo)) . ".jpg";

        // Adiciona a figura e suas categorias ao banco de dados
        adicionarFiguraACategorias($titulo, $img, $categorias);
    } else {
        echo "Erro: Dados do formulário incompletos.";
    }
} else {
    // Redireciona para a página do formulário se não houver dados enviados
    header("Location: add_figuras.php");
    exit;
}
?>
