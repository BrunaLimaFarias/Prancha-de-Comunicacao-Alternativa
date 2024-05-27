<?php

require_once("../util/db.php");


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

// Função para relacionar figura e categoria
function relacionarFiguraCategoria($conn, $figura_id, $categoria_id) {
    $query = "INSERT INTO figura_categoria (figura_id, categoria_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE figura_id=figura_id";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $figura_id, $categoria_id);
    $stmt->execute();
    $stmt->close();
}

// Função principal para adicionar figura a categorias
function adicionarFiguraACategorias($titulo, $img, $categorias) {
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
        
        echo "Figura '$titulo' associada às categorias: " . implode(", ", $categorias) . " com sucesso!";
    } finally {
        // Fecha a conexão com o banco de dados
        $conn->close();
    }
}

// Adicione um bloco de teste para validar a função
if (isset($argv) && count($argv) > 1) {
    $titulo = $argv[1];
    $img = $argv[2];
    $categorias = array_slice($argv, 3);

    adicionarFiguraACategorias($titulo, $img, $categorias);
}
?>
