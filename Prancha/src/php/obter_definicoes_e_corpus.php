<?php

// Configurações do cabeçalho para retorno de JSON
header('Content-Type: application/json');

// Função para carregar o corpus
function carregarCorpus() {
    $corpus = <<<EOD
    Bom dia! Dormiu bem?
    Bom dia! Sim, dormi muito bem. E você?
    Também dormi bem. Vamos tomar café da manhã?
    Claro, o que temos para comer?
    Temos pão, fruta e suco.
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
    Que tal a tarde?
    Perfeito, nos encontramos na sala de conferências.
    Combinado.
    O que você quer fazer neste fim de semana?
    Eu estava pensando em ir ao parque.
    Boa ideia. Podemos fazer um piquenique.
    Perfeito! Vou preparar alguns sanduíches.
    Quer ir ao cinema amanhã?
    Sim, eu adoraria. Qual filme você quer ver?
    Estou pensando em ver aquele novo filme de aventura.
    Parece bom. Vamos comprar os ingressos online.
    Precisamos fazer algumas compras.
    O que está na lista?
    Precisamos de leite, pão, ovos e frutas.
    Certo. Vamos ao supermercado agora?
    Sim, vamos.
    Gostou dessa camisa?
    Sim, é bonita. E você, o que acha?
    Acho que ficaria ótima em você. Experimente!
    Vou experimentar. Vamos ver como fica.
    Tenho uma consulta médica hoje.
    A que horas é?
    15h.
    Quer que eu vá com você?
    Sim, por favor. Agradeço a companhia.
    Como você está se sentindo depois da consulta?
    Estou me sentindo melhor. O médico foi muito atencioso.
    Que bom! O que ele recomendou?
    Disse para eu descansar e tomar a medicação.
    O que você quer fazer neste fim de semana?
    Eu estava pensando em ir ao parque.
    Boa ideia. Podemos fazer um piquenique.
    Perfeito! Vou preparar alguns sanduíches.
    Quer ir ao cinema amanhã?
    Sim, eu adoraria. Qual filme você quer ver?
    Estou pensando em ver aquele novo filme de aventura.
    Parece bom. Vamos comprar os ingressos online.
    Precisamos fazer algumas compras.
    O que está na lista?
    Precisamos de leite, pão, ovos e frutas.
    Certo. Vamos ao supermercado agora?
    Sim, vamos.
    Gostou dessa camisa?
    Sim, é bonita. E você, o que acha?
    Acho que ficaria ótima em você. Experimente!
    Vou experimentar. Vamos ver como fica.
    Tenho uma consulta médica hoje.
    A que horas é?
    Às 15h.
    Quer que eu vá com você?
    Sim, por favor. Agradeço a companhia.
    Como você está se sentindo depois da consulta?
    Estou me sentindo melhor. O médico foi muito atencioso.
    Que bom! O que ele recomendou?
    Disse para eu descansar e tomar a medicação.
    Você vai à festa de aniversário do João?
    Sim, vou. E você?
    Também vou. Podemos ir juntos?
    Claro, combinamos o horário.
    Você conhece muitas pessoas aqui?
    Não muitas, mas estou conhecendo algumas agora.
    Eu também. Vamos conversar com aquele grupo ali?
    Vamos sim!
    O ônibus está demorando.
    Sim, já estamos esperando há 20 minutos.
    Será que tem algum problema na linha?
    Pode ser. Talvez seja melhor pegar um táxi.
    Concordo, vamos chamar um.
    O trânsito está terrível hoje.
    Verdade, estamos muito atrasados.
    Talvez devêssemos ter saído mais cedo.
    Da próxima vez, vamos sair com mais antecedência.
    Já decidiu o que vai pedir?
    Sim, vou pedir uma salada de frango.
    Parece bom. Eu vou de lasanha.
    Vamos pedir uma entrada também?
    Boa ideia. Que tal pastel
    O que achou da comida?
    Estava deliciosa. E a sua?
    Também estava ótima. Gostei muito do molho.
    Vamos voltar aqui mais vezes.
    Já fez as malas para a viagem?
    Ainda não, vou fazer hoje à noite.
    Não se esqueça do protetor solar.
    Obrigado por lembrar. Vou colocar na lista.
    O que você quer fazer neste fim de semana?
    Eu estava pensando em ir ao parque.
    Boa ideia. Podemos fazer um piquenique.
    Perfeito! Vou preparar alguns sanduíches.
    Quer ir ao cinema amanhã?
    Sim, eu adoraria. Qual filme você quer ver?
    Estou pensando em ver aquele novo filme de aventura.
    Parece bom. Vamos comprar os ingressos online.
    Precisamos fazer algumas compras.
    O que está na lista?
    Precisamos de leite, pão, ovos e frutas.
    Certo. Vamos ao supermercado agora?
    Sim, vamos.
    Gostou dessa camisa?
    Sim, é bonita. E você, o que acha?
    Acho que ficaria ótima em você. Experimente!
    Vou experimentar. Vamos ver como fica.
    Tenho uma consulta médica hoje.
    A que horas é?
    Às 15h.
    Quer que eu vá com você?
    Sim, por favor. Agradeço a companhia.
    Como você está se sentindo depois da consulta?
    Estou me sentindo melhor. O médico foi muito atencioso.
    Que bom! O que ele recomendou?
    Disse para eu descansar e tomar a medicação.
    Você vai à festa de aniversário do João?
    Sim, vou. E você?
    Também vou. Podemos ir juntos?
    Claro, combinamos o horário.
    Você conhece muitas pessoas aqui?
    Não muitas, mas estou conhecendo algumas agora.
    Eu também. Vamos conversar com aquele grupo ali?
    Vamos sim!
    O ônibus está demorando.
    Sim, já estamos esperando há 20 minutos.
    Será que tem algum problema na linha?
    Pode ser. Talvez seja melhor pegar um táxi.
    Concordo, vamos chamar um.
    O trânsito está terrível hoje.
    Verdade, estamos muito atrasados.
    Talvez devêssemos ter saído mais cedo.
    Da próxima vez, vamos sair com mais antecedência.
    Já decidiu o que vai pedir?
    Sim, vou pedir uma salada de frango.
    Parece bom. Eu vou de lasanha.
    Vamos pedir uma entrada também?
    Boa ideia. Que tal bruschetta?
    O que achou da comida?
    Estava deliciosa. E a sua?
    Também estava ótima. Gostei muito do molho.
    Vamos voltar aqui mais vezes.
    Já fez as malas para a viagem?
    Ainda não, vou fazer hoje à noite.
    Não se esqueça do protetor solar.
    Obrigado por lembrar. Vou colocar na lista.
    Qual será o nosso primeiro destino?
    Vamos começar pelo museu.
    Ótimo. Depois podemos almoçar em algum lugar próximo.
    Combinado. Estou ansioso para explorar a cidade.
    Você terminou a redação para a aula de literatura?
    Sim, terminei ontem. E você?
    Ainda estou escrevendo. Está difícil concluir.
    Quer que eu revise para você quando terminar?
    Sim, por favor. Agradeço a ajuda.
    Qual é o tema da sua apresentação?
    Vou falar sobre a importância da energia renovável.
    Interessante. Quer praticar a apresentação comigo?
    Adoraria. Vamos começar?
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
