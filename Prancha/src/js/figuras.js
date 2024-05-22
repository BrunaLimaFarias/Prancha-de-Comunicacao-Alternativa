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
async function atualizarFraseFormada() {
    try {
        const fraseListaElement = document.getElementById('frase-lista');
        fraseListaElement.innerHTML = ''; // Limpa a lista antes de atualizar

        // Cria elementos para cada figura selecionada e adiciona à lista
        const elementosLista = figurasSelecionadas.map(figura => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${figura.img}" alt="${figura}">
                <div class="card-body">
                    <h5 class="card-title">${figura}</h5>
                </div>`;
            return li;
        });

        // Adiciona os elementos à lista
        elementosLista.forEach(elemento => fraseListaElement.appendChild(elemento));
    } catch (error) {
        console.error('Erro ao atualizar a frase formada:', error);
    }
}

// Função para buscar as figuras do banco de dados e criar os cards
async function buscarFigurasEGerarCards(categoria = '') {
    try {
        const response = await fetch(`php/listar.php?categoria=${encodeURIComponent(categoria)}`); // Adicione a categoria à URL da requisição
        const data = await response.json();

        const cardsContainer = document.getElementById('cards-container');

        // Limpa o container de cards antes de gerar os novos cards
        cardsContainer.innerHTML = '';

        // Cria os cards e adiciona ao container
        data.forEach(figura => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.setAttribute('data-figura', figura.titulo);
            cardDiv.innerHTML = `
                <img src="${figura.img}" alt="${figura.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${figura.titulo}</h5>
                </div>`;

            // Adiciona evento de clique para adicionar a figura à frase
            cardDiv.addEventListener('click', () => {
                adicionarFiguraAFrase(figura.titulo);
                cardDiv.classList.add('selected');
                setTimeout(() => {
                    cardDiv.classList.remove('selected');
                }, 300);
            });

            cardsContainer.appendChild(cardDiv);
        });

        // Após gerar os cards, atualiza a frase formada
        atualizarFraseFormada();
    } catch (error) {
        console.error('Erro ao buscar figuras:', error);
    }
}


// Adiciona eventos de clique aos botões de selecionar categoria
window.onload = function() {
    // Adicionar evento de clique aos botões de categoria
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            console.log('Categoria selecionada:', selectedCategory); // Debug: verifique se a categoria está sendo capturada
            buscarFigurasEGerarCards(selectedCategory); // Chamada da função modificada com a categoria selecionada
        });
    });

    // Chamada inicial para buscar as figuras do banco de dados e gerar os cards
    buscarFigurasEGerarCards();
};




// Event listener para clicar no botão de exclusão da última figura
document.getElementById('btn-excluir-ultima').addEventListener('click', () => {
    removerUltimaFigura();
});

// Event listener para clicar no botão de limpar a frase
document.getElementById('btn-limpar-frase').addEventListener('click', () => {
    limparFrase();
});

// Chamada da função para buscar as figuras do banco de dados e gerar os cards
buscarFigurasEGerarCards();
