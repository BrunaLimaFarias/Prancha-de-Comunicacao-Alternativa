<?php

require_once("../util/db.php");
require_once("../util/add_figure_to_category.php");

// Função para inserir uma categoria e retornar seu ID
function inserirCategoria($conn, $nome) {
    $query = "INSERT INTO categorias (nome) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $nome);
    $stmt->execute();
    $categoria_id = $stmt->insert_id;
    $stmt->close();
    return $categoria_id;
}

// Função para inserir uma figura e retornar seu ID
function inserirFigura($conn, $titulo, $img) {
    $query = "INSERT INTO lista_figuras (titulo, img) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $titulo, $img);
    $stmt->execute();
    $figura_id = $stmt->insert_id;
    $stmt->close();
    return $figura_id;
}

// Função para inserir uma palavra e retornar seu ID
function inserirPalavra($conn, $palavra) {
    $query = "INSERT INTO palavras (palavra) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $palavra);
    $stmt->execute();
    $palavra_id = $stmt->insert_id;
    $stmt->close();
    return $palavra_id;
}

// Função para relacionar figura e categoria
function relacionarFiguraCategoria($conn, $figura_id, $categoria_id) {
    $query = "INSERT INTO figura_categoria (figura_id, categoria_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE figura_id=figura_id";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $figura_id, $categoria_id);
    $stmt->execute();
    $stmt->close();
}

// Função para relacionar figura e palavra
function relacionarFiguraPalavra($conn, $figura_id, $palavra_id) {
    $query = "INSERT INTO figura_palavra (figura_id, palavra_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE figura_id=figura_id";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $figura_id, $palavra_id);
    $stmt->execute();
    $stmt->close();
}

// Função principal para adicionar figura a categorias e palavras
function adicionarFiguraACategoriasEPalavras($titulo, $img, $categorias, $palavras) {
    // Conecta ao banco de dados
    $conn = conectar_bd();
    
    try {
        // Insere a figura
        $figura_id = inserirFigura($conn, $titulo, $img);
        
        // Insere ou obtém os IDs das categorias e cria as relações
        foreach ($categorias as $categoria) {
            $categoria_id = inserirCategoria($conn, $categoria);
            relacionarFiguraCategoria($conn, $figura_id, $categoria_id);
        }

        // Insere ou obtém os IDs das palavras e cria as relações
        foreach ($palavras as $palavra) {
            $palavra_id = inserirPalavra($conn, $palavra);
            relacionarFiguraPalavra($conn, $figura_id, $palavra_id);
        }
        
        echo "Figura '$titulo' associada às categorias: " . implode(", ", $categorias) . " e palavras: " . implode(", ", $palavras) . " com sucesso!";
    } finally {
        // Fecha a conexão com o banco de dados
        $conn->close();
    }
}

// Verifica se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    if (isset($_POST["titulo"]) && isset($_POST["categorias"]) && isset($_POST["palavras"])) {
        $titulo = $_POST["titulo"];
        $categorias = explode(",", $_POST["categorias"]);
        $palavras = explode(",", $_POST["palavras"]);

        // Constrói o caminho da imagem com base no título da figura
        $img = "./img/figuras/" . str_replace(' ', '_', strtolower($titulo)) . ".jpg";

        // Verifica se a imagem existe na pasta especificada
        if (!file_exists($img)) {
            echo "Erro: A imagem '$img' não foi encontrada.";
            exit;
        }
        
        // Adiciona a figura, suas categorias e palavras ao banco de dados
        adicionarFiguraACategoriasEPalavras($titulo, $img, $categorias, $palavras);
    } else {
        echo "Erro: Dados do formulário incompletos.";
    }
} else {
    // Redireciona para a página do formulário se não houver dados enviados
    header("Location: add_figuras.php");
    exit;
}
?>
