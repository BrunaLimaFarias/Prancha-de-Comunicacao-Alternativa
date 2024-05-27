<?php
require_once("../util/db.php");

// Caminho do diretório onde as imagens estão hospedadas localmente
$diretorio_imagens = './img/figuras/';

// URL do diretório onde as imagens estão hospedadas online
$url_diretorio_imagens = 'http://localhost/tcc/tcc_prancha_caa/Prancha/src/img/figuras/';

// Conecta ao banco de dados
$conn = conectar_bd();

// Prepara a query de inserção
$query = "INSERT INTO lista_figuras (titulo, img) VALUES (?, ?)";

// Prepara a declaração
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $titulo, $img);

// Faz uma solicitação HTTP para o diretório de imagens
$conteudo = @file_get_contents($url_diretorio_imagens);

// Verifica se a solicitação foi bem sucedida
if ($conteudo !== false) {
    // Extrai os links das imagens do conteúdo HTML
    preg_match_all('/<a[^>]+href=([\'"])(?<url>.+?)\1[^>]*>/i', $conteudo, $matches);

    // Loop pelos links encontrados
    foreach ($matches['url'] as $url) {
        // Verifica se o link aponta para uma imagem
        if (preg_match('/\.(jpg)$/', $url)) {
            // Define os parâmetros da query
            $nome_arquivo = basename(urldecode($url)); // Nome do arquivo é o título
            $titulo = pathinfo($nome_arquivo, PATHINFO_FILENAME); // Remove a extensão do nome do arquivo
            $img = $diretorio_imagens . $nome_arquivo; // Caminho completo da imagem local
            
            // Executa a query
            $stmt->execute();
            
            echo "Nome do arquivo: $titulo\n"; // Debug
            echo "Caminho da imagem: $img\n"; // Debug
        }
    }

    echo "Figuras inseridas com sucesso!\n";
} else {
    echo "Erro ao fazer a solicitação HTTP.\n";
}

// Fecha a declaração
$stmt->close();

// Fecha a conexão com o banco de dados
$conn->close();

?>
