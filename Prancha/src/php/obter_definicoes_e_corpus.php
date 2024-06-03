<?php
/* Este script PHP faz o seguinte:

Define os cabeçalhos para que a resposta seja interpretada como JSON.
Define uma função para carregar o corpus de texto. Neste exemplo, o corpus é definido diretamente no código, mas poderia ser carregado de um arquivo ou banco de dados.
Define um array de definições ($definicoes) com um exemplo de ID do corpus.
Cria uma estrutura de resposta contendo as definições e o corpus.
Converte a estrutura de resposta para JSON e a envia como resposta.
*/

// Configurações do cabeçalho para retorno de JSON
header('Content-Type: application/json');

// Função para carregar o corpus
function carregarCorpus() {
    $corpus = "../util/corpus.txt";
    
    return $corpus;
}

// Definições do corpus (exemplo)
$definicoes = [
    'IdCorpus' => 0
];

// Estrutura de dados para retorno
$response = [
    'definicoes' => $definicoes,
    'corpus' => [
        'corpus' => carregarCorpus()
    ]
];

// Retorno da resposta em formato JSON
echo json_encode($response);
