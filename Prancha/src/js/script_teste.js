// Dados das figuras
const trainingData = [
    { word: "Eu", image: "./teste/outro_teste/logo.png" },
    { word: "quero", image: "./teste/outro_teste/apontador.jpg" },
    { word: "maçã", image: "./teste/outro_teste/arbusto.jpg" },
    { word: "laranja", image: "./teste/outro_teste/laranja.png" },
    { word: "amarelo", image: "./teste/outro_teste/amarelo.png" },
    { word: "marrom", image: "./teste/outro_teste/marrom.jpg" },
    { word: "preto", image: "./teste/outro_teste/preto.jpg" },
    { word: "rosa", image: "./teste/outro_teste/rosa.png" },
    { word: "verde", image: "./teste/outro_teste/verde.png" },
    { word: "vermelho", image: "./teste/outro_teste/vermelho.png" }
];

// Lista para armazenar as figuras selecionadas
let figurasSelecionadas = [];

// Função para adicionar uma figura à lista ao clicar
function adicionarFiguraAFrase(figura) {
    figurasSelecionadas.push(figura);
    atualizarFraseFormada();
}

// Função para remover a última figura da lista
function removerUltimaFigura() {
    figurasSelecionadas.pop();
    atualizarFraseFormada();
}

// Função para limpar a frase formada
function limparFrase() {
    figurasSelecionadas = [];
    atualizarFraseFormada();
}

// Função para atualizar a exibição da lista de figuras selecionadas
function atualizarFraseFormada() {
    const fraseListaElement = document.getElementById('frase-lista');
    fraseListaElement.innerHTML = ''; // Limpa a lista antes de atualizar
    figurasSelecionadas.forEach(figura => {
        const li = document.createElement('li');
        const imagem = trainingData.find(data => data.word === figura).image;
        li.innerHTML = `<img src="${imagem}" alt="${figura}"> ${figura}`;
        fraseListaElement.appendChild(li);
    });
}

// Função para gerar os cards das figuras
function gerarCardsFiguras() {
    const cardsContainer = document.getElementById('cards-container');
    trainingData.forEach(figura => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-figura', figura.word); // Definir o atributo data-figura
        cardDiv.innerHTML = `
            <img src="${figura.image}" alt="${figura.word}">
            <div class="card-body">
                <h5 class="card-title">${figura.word}</h5>
            </div>
        `;
        // Adicionar evento de clique para adicionar a figura à frase
        cardDiv.addEventListener('click', () => {
            adicionarFiguraAFrase(figura.word);
            cardDiv.classList.add('selected');
            setTimeout(() => {
                cardDiv.classList.remove('selected');
            }, 300);
        });
        cardsContainer.appendChild(cardDiv);
    });
}

// Event listener para clicar no botão de exclusão da última figura
document.getElementById('btn-excluir-ultima').addEventListener('click', () => {
    removerUltimaFigura();
});

// Event listener para clicar no botão de limpar a frase
document.getElementById('btn-limpar-frase').addEventListener('click', () => {
    limparFrase();
});

// Chamada da função para gerar os cards das figuras
gerarCardsFiguras();
