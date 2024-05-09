// Dados das figuras
const trainingData = [
    { word: "Eu", image: "logo.png" },
    { word: "quero", image: "apontador.jpg" },
    { word: "maçã", image: "arbusto.jpg" },
    { word: "laranja", image: "laranja.png" },
    { word: "amarelo", image: "amarelo.png" },
    { word: "marrom", image: "marrom.jpg" },
    { word: "preto", image: "preto.jpg" },
    { word: "rosa", image: "rosa.png" },
    { word: "verde", image: "verde.png" },
    { word: "vermelho", image: "vermelho.png" }
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
