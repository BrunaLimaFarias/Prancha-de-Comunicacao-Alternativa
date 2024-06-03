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
    // Exemplo de corpus de conversas (pode ser substituído pelo corpus real)
    $corpus = <<<EOD
    Bom dia! Dormiu bem?
    Bom dia! Sim, dormi muito bem. E você?
    Também dormi bem. Vamos tomar café da manhã?
    Claro, o que temos para comer?
    Temos pão, frutas e suco.
    Parece ótimo!
    Está na hora de ir para a escola.
    Estou pronto. Peguei minha mochila e meu lanche.
    Ótimo! Não se esqueça do seu casaco, está frio lá fora.
    Obrigado por lembrar. Vamos!
    Como foi sua manhã no trabalho?
    Foi boa, mas bastante corrida. E a sua?
    A minha também foi agitada. O que você vai almoçar?
    Acho que vou pedir uma salada.
    Boa ideia. Eu vou de sanduíche.
    Você fez a lição de casa de matemática?
    Sim, fiz ontem à noite. E você?
    Estou quase terminando. Preciso de ajuda com um exercício.
    Claro, vamos resolver juntos.
    O que vamos jantar hoje?
    Podemos fazer macarrão com molho de tomate.
    Parece ótimo. Você precisa de ajuda na cozinha?
    Sim, pode cortar os vegetais?
    Com certeza.
    Quer assistir a um filme depois do jantar?
    Adoraria. Que tipo de filme você quer ver?
    Que tal uma comédia?
    Perfeito! Vamos assistir juntos.
    Qual é a sua matéria favorita?
    Eu gosto muito de ciências. E você?
    Eu prefiro história. É fascinante.
    Concordo, história também é muito interessante.
    Vamos estudar para a prova de inglês?
    Sim, podemos revisar o vocabulário.
    Ótimo. Podemos começar pelas palavras novas da última aula.
    Boa ideia.
    Você terminou o relatório do projeto?
    Sim, terminei ontem à noite. Já enviou o seu?
    Estou revisando agora. Vou enviar em breve.
    Precisamos estar prontos para a reunião de amanhã.
    Com certeza. Vou me preparar.
    Podemos discutir a estratégia de marketing?
    Claro, quando você está disponível?
    Que tal às 14h?
    Perfeito, nos encontramos na sala de conferências.
    Combinado.
    EOD;
    
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
