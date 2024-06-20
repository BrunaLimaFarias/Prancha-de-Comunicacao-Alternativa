<?php

// Configurações do cabeçalho para retorno de JSON
header('Content-Type: application/json');

// Função para carregar o corpus
function carregarCorpus() {
    $corpus = <<<EOD
    Bom dia! Dormiu bem?
    Os balões coloridos enfeitavam o céu azul durante a festa.
    A bala de morango estava escondida entre os doces da mesa.
    A bala chiclete era a preferida das crianças por seu sabor duradouro.
    As crianças adoravam balançar no parquinho perto de casa.
    O balde estava cheio de água para regar as plantas do jardim.
    Ela comprou uma balinha de hortelã na loja de conveniência.
    O bambu gigante servia de apoio para diversas plantas no jardim.
    Ele comeu uma deliciosa banana no café da manhã.
    Sentaram-se no banco de praça para descansar após a caminhada.
    A bandeira do Brasil tremulava orgulhosamente no mastro.
    Ela adorava banhar-se no mar durante as férias de verão.
    O banheiro do restaurante estava impecavelmente limpo.
    Ele colocou um pequeno banquinho para alcançar o armário alto.
    Uma barata assustou todos na cozinha durante a noite.
    O barato do dia era um desconto imperdível na loja.
    Espero que essas frases sejam úteis para o que você precisa!
    Os balões coloridos enfeitavam o céu azul durante a festa.
    A bala de morango estava escondida entre os doces da mesa.
    A bala chiclete era a preferida das crianças por seu sabor duradouro.
    As crianças adoravam balançar no parquinho perto de casa.
    O balde estava cheio de água para regar as plantas do jardim.
    Ela comprou uma deliciosa balinha na loja de doces.
    O bambu era usado para fazer móveis e objetos decorativos.
    Ela comeu uma deliciosa banana no café da manhã.
    Sentaram-se no banco de praça para descansar após a caminhada.
    A bandeira do Brasil tremulava orgulhosamente no mastro.
    Ela adorava banhar-se no mar durante as férias de verão.
    O banheiro do restaurante estava impecavelmente limpo.
    Ele colocou um pequeno banquinho para alcançar o armário alto.
    Uma barata assustou todos na cozinha durante a noite.
    Ele encontrou um barco à deriva no lago e decidiu explorá-lo.
    A bar lanchonete era o ponto de encontro dos amigos aos finais de semana.
    Ele estava com barriga cheia depois do jantar farto.
    O barrigudo não cabia mais na cadeira apertada.
    Ele jogava basquete todos os dias no parque.
    Tinha bastante comida para a festa de aniversário.
    Ela colheu algumas batatas para fazer purê no jantar.
    A batedeira facilitava muito na hora de preparar bolos e doces.
    Ele começou a bater palmas quando viu o resultado do jogo.
    Ela experimentou um novo batom vermelho que comprou na loja.
    O bebê adorava brincar com seu bichinho de pelúcia.
    Ele estava bebado e precisava de ajuda para voltar para casa.
    Eles decidiram beber um vinho tinto para comemorar a promoção.
    Eles adoravam se beijar à luz do luar.
    Ela era conhecida por sua beleza fenomenal.
    Ele tinha uma beleza natural que encantava a todos.
    Ele adorava beliscar petiscos durante a tarde.
    Ele usava uma bengala para caminhar com mais segurança.
    Ela preparou uma deliciosa beringela recheada para o almoço.
    Ele plantou algumas mudas de beringela_45g no jardim.
    Um besouro pousou suavemente na flor do jardim.
    Ela disse uma besteira sem querer durante a reunião.
    O bicho de estimação dele era um cachorro muito brincalhão.
    Ele andava de bicicleta todos os dias para ir ao trabalho.
    Ele tinha um grande bigode que chamava a atenção de todos.
    O bilhete ingresso era a sua entrada para o show tão esperado.
    O bispo de sua igreja era muito querido pela comunidade.
    Ela cortou um bloco EVA para fazer artesanato com as crianças.
    Ele anotou o número do telefone no bloco de notas.
    Eles brincavam com blocos de montar na sala de estar.
    Ela usava uma linda blusa azul para o evento.
    Ele machucou a boca ao morder a maçã com força.
    O bode subiu na pedra para observar o pasto.
    O boi pastava tranquilamente no campo aberto.
    Eles jogaram uma partida de bola no parque.
    Ele colecionava bolas de gude desde criança.
    As crianças brincavam com várias bolas coloridas no pátio da escola.
    Ele soprou uma enorme bolha de sabão que flutuou pelo ar.
    Ela usava uma bolinha de terapia para fortalecer as mãos.
    Ela fez um delicioso bolo de chocolate para a sobremesa.
    Ela segurava uma elegante bolsa de couro preto.
    Ele comprou um bombom para presentear sua mãe.
    Ele usava um boné para se proteger do sol forte.
    Ela brincava com sua boneca favorita no quarto.
    Ela era tão bonita quanto uma bonita_branca.
    Ele tinha um sorriso tão encantador quanto um bonito_branco.
    Ele viu uma linda borboleta (1) pousada na flor do jardim.
    Ela estudou sobre a vida da borboleta para a escola.
    Ele pisou em uma bosta de cachorro sem perceber.
    Ele calçou suas botas de couro para a caminhada na trilha.
    Ele trocou o botijão de gás da cozinha sem problemas.
    Ele levantou os braços para comemorar a vitória.
    Ela estava brava com ele por ter esquecido o aniversário.
    Eles comeram brigadeiro até se sentirem enjoados.
    Eles decidiram brigar por causa da disputa no jogo.
    Ela fez uma brincadeirinha para animar a festa.
    Ela ganhou um lindo brinco de presente de aniversário.
    Eles doaram vários brinquedos para a campanha de Natal.
    Ela deu uma bronca-1 no filho por ter quebrado o vaso.
    Ele levou uma bronca do chefe por ter se atrasado novamente.
    Ela passou bronzeador para se proteger do sol na praia.
    O broto da planta começou a crescer no vaso.
    Ela se vestiu de bruxa para a festa de Halloween.
    Ele estudava os ensinamentos de um mestre budista.
    Ela dançava ao som do bum bum da música.
    Ele guardava uma cédula de 2 reais como lembrança.
    Ele guardava uma cédula de 10 reais para emergências.
    Ele tinha uma cédula de 20 reais na carteira.
    Ele encontrou uma cédula de 50 reais perdida na rua.
    Ela economizou uma cédula de 100 reais para comprar um presente.
    Ele pagou com uma cédula de cinco reais pela passagem de ônibus.
    O céu estava limpo e o sol brilhava intensamente.
    Ele desenhou um círculo perfeito no papel.
    Eles passearam às margens do córrego nos fins de semana.
    Ele quebrou o côco para beber a água de dentro.
    O caçador seguia as pegadas do animal na floresta.
    Ela pintou a cabeça cor de rosa para a festa à fantasia.
    Ele viu um inseto cabeçudo no jardim do vizinho.
    Ela era uma excelente cabeleireira e sempre tinha clientes.
    Ele cortou o cabelo com seu cabeleireiro de confiança.
    Ele usava um boné para se proteger do sol forte.
    Ele cortou o cabelo mais curto para o verão.
    Ele não sabia se a caixa caberia no carro.
    A criança ficou surpresa com a caixa surpresa que ganhou da avó.
    Ele colheu um caju do pé para saborear.
    Ela vestiu uma camisa de manga curta para o passeio.
    Ele deitou na cama para descansar depois do trabalho.
    Ele escreveu um lindo cartão para sua namorada.
    Ela comprou um novo carro para a família.
    Ele andava de carroça pelas ruas da cidade.
    Ele estava cansado depois de um dia longo de trabalho.
    Ela usava uma saia capa_de_sol para se proteger do sol.
    Ele cortou a capa-de-sol com cuidado para não estragar.
    Ele viu um capitão navegando o barco pelo rio.
    Ela adorava brincar de capturar as bandeirinhas no campo.
    Ele preparou um carneiro assado para o almoço de domingo.
    Ela assistiu ao pôr do sol sentada na cadeira de praia.
    Ele usou uma cadeira de rodas temporariamente após o acidente.
    Ele cortou a grama usando um cado.
    Ele cafezinho todas as manhãs para começar bem o dia.
    Ele derrubou o café na mesa e manchou a toalha.
    Ele viu um caipira tocando viola na praça.
    Ela plantou algumas mudas de caju no quintal.
    Ele ganhou um caju como presente do amigo.
    Ele limpou a cama e trocou os lençóis.
    Ele precisava de uma câmera nova para o trabalho.
    Ela foi ao circo pela primeira vez na vida.
    Mediu a circunferência da roda com precisão.
    O cisne nadava graciosamente no lago.
    A cisticercose é uma doença causada por parasitas.
    Frequentava o clube todos os fins de semana.
    O chão estava molhado após a chuva.
    O chaveiro consertou a chave de fenda.
    O chefe e o empregado trabalhavam lado a lado.
    Anunciaram a chegada do novo produto.
    Ele vai chegar mais tarde por causa do trânsito.
    O balde estava cheio de água limpa.
    Ela foi ao circo pela primeira vez na vida.
    Mediu a circunferência da roda com precisão.
    O cisne nadava graciosamente no lago.
    A cisticercose é uma doença causada por parasitas.
    Frequentava o clube todos os fins de semana.
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
