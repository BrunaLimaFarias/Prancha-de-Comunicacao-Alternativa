<?php

require_once("../util/db.php");
require_once("../util/add_img.php");

// Função para verificar se uma figura existe e obter seu ID
function verificarFiguraExiste($conn, $titulo) {
    $figura_id = null;
    $sql = "SELECT id FROM lista_figuras WHERE palavra = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $titulo);
    $stmt->execute();
    $stmt->bind_result($figura_id);
    $stmt->fetch();
    $stmt->close();
    return $figura_id;
}

// Função para adicionar uma nova figura
function adicionarFigura($conn, $palavra, $img) {
    $sql = "INSERT INTO lista_figuras (palavra, img) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $palavra, $img);
    $stmt->execute();
    $figura_id = $stmt->insert_id;
    $stmt->close();
    return $figura_id;
}

// Função para verificar se uma categoria existe e obter seu ID
function verificarCategoriaExiste($conn, $nome) {
    $categoria_id = null;
    $sql = "SELECT id FROM categorias WHERE nome = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nome);
    $stmt->execute();
    $stmt->bind_result($categoria_id);
    $stmt->fetch();
    $stmt->close();
    return $categoria_id;
}

// Função para adicionar uma nova categoria
function adicionarCategoria($conn, $nome) {
    $sql = "INSERT INTO categorias (nome) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nome);
    $stmt->execute();
    $categoria_id = $stmt->insert_id;
    $stmt->close();
    return $categoria_id;
}

// Função para verificar se a relação figura-categoria já existe
function verificarFiguraCategoriaExiste($conn, $figura_id, $categoria_id) {
    $count = null;
    $sql = "SELECT COUNT(*) FROM figura_categoria WHERE figura_id = ? AND categoria_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $figura_id, $categoria_id);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();
    return $count > 0;
}

// Função para adicionar a relação entre figura e categoria
function adicionarFiguraCategoria($conn, $figura_id, $categoria_id) {
    // Verifica se a relação já existe
    if (!verificarFiguraCategoriaExiste($conn, $figura_id, $categoria_id)) {
        $sql = "INSERT INTO figura_categoria (figura_id, categoria_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $figura_id, $categoria_id);
        $stmt->execute();
        $stmt->close();
    }
}

// Função para processar o arquivo TXT
function processarArquivo($arquivo) {
    $conn = conectar_bd();

    // Abrir o arquivo para leitura
    $handle = fopen($arquivo, "r");
    if ($handle) {
        while (($line = fgets($handle)) !== false) {
            // Separar título e categoria
            list($titulo, $categorias) = explode(" - ", trim($line));
            $categorias = explode(",", $categorias);

            // Verificar se a figura já existe
            $figura_id = verificarFiguraExiste($conn, $titulo);
            if (!$figura_id) {
                // Adicionar a nova figura
                $img = "./img/figuras/" . str_replace(' ', '_', strtolower($titulo)) . ".jpg";
                $figura_id = adicionarFigura($conn, $titulo, $img);
            }

            // Adicionar categorias
            foreach ($categorias as $categoria) {
                $categoria = trim($categoria);
                $categoria_id = verificarCategoriaExiste($conn, $categoria);
                if (!$categoria_id) {
                    $categoria_id = adicionarCategoria($conn, $categoria);
                }

                // Adicionar relação figura-categoria
                adicionarFiguraCategoria($conn, $figura_id, $categoria_id);
            }
        }

        fclose($handle);
    } else {
        echo "Não foi possível abrir o arquivo.";
    }

    $conn->close();
}

// Caminho do arquivo de texto
$arquivo = "catFig.txt";

// Verifica se o arquivo existe antes de processá-lo
if (file_exists($arquivo)) {
    processarArquivo($arquivo);
} else {
    echo "Arquivo $arquivo não encontrado.";
}

echo "Processamento concluído.";

?>
