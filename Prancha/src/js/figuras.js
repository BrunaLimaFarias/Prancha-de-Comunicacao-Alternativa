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

        // Percorre a lista de figuras selecionadas e cria elementos para exibir cada uma delas
        figurasSelecionadas.forEach(figura => {
            const li = document.createElement('li');
            
            li.innerHTML = `
                        <img src="${figura.img}" alt="${figura}">
                        <div class="card-body">
                            <h5 class="card-title">${figura}</h5>
                        </div>`
            fraseListaElement.appendChild(li);
        });
    }catch (error) {
        console.error('Erro ao buscar figuras:', error);
    }
}

// Função para buscar as figuras do banco de dados e criar os cards
async function buscarFigurasEGerarCards() {
    try {
        const response = await fetch("php/listar.php");
        const data = await response.json();

        const cardsContainer = document.getElementById('cards-container');

        data.forEach(figura => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.setAttribute('data-figura', figura.titulo); // Definir o atributo data-figura
            cardDiv.innerHTML = `
                <img src="${figura.img}" alt="${figura.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${figura.titulo}</h5>
                </div>
            `;
            // Adicionar evento de clique para adicionar a figura à frase
            cardDiv.addEventListener('click', () => {
                adicionarFiguraAFrase(figura.titulo);
                cardDiv.classList.add('selected');
                setTimeout(() => {
                    cardDiv.classList.remove('selected');
                }, 300);
            });
            cardsContainer.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar figuras:', error);
    }
}

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
