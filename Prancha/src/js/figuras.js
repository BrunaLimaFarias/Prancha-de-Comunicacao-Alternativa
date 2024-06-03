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
    try {
        const fraseListaElement = document.getElementById('frase-lista');
        fraseListaElement.innerHTML = ''; // Limpa a lista antes de atualizar

        // Cria elementos para cada figura selecionada e adiciona à lista
        figurasSelecionadas.forEach(figura => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${figura.img}" alt="${figura.palavra}">
                <div class="card-body">
                    <h5 class="card-title">${figura.palavra}</h5>
                </div>`;
            fraseListaElement.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao atualizar a frase formada:', error);
    }
}

// Função para carregar as categorias do servidor
async function carregarCategorias() {
    try {
        const response = await fetch('php/obter_categorias.php');
        const categorias = await response.json();
        console.log('Categorias carregadas:', categorias);
        return categorias;
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        return [];
    }
}

function criarBotoesDeCategoria(categorias, markovChain, wordImageMap) {
    const categorySelector = document.querySelector('.category-selector');
    categorySelector.innerHTML = ''; // Limpa os botões existentes

    categorias.forEach(categoria => {
        const button = document.createElement('button');
        button.classList.add('category-btn');
        button.dataset.category = categoria;
        button.textContent = categoria;
        button.setAttribute('aria-label', `Selecionar categoria ${categoria}`);
        categorySelector.appendChild(button);

        // Adiciona o evento de clique para chamar buscaFigura com a categoria correspondente
        button.addEventListener('click', () => {
            console.log(`Botão da categoria clicado: ${categoria}`); // Log de verificação
            buscaFigura(categoria, markovChain, wordImageMap);
        });
    });
}

// Função para carregar imagens com fallback
function loadImage(src, fallbackSrc) {
    const img = new Image();
    img.src = src;
    img.onerror = () => {
        img.src = fallbackSrc;
    };
    return img;
}

// Função para buscar as figuras do banco de dados e criar os cards
async function buscaFigura(categoriaDesejada = '', markovChain, wordImageMap) {
    try {
        console.log(`Iniciando busca de figuras para a categoria: ${categoriaDesejada}`); // Log de verificação
        if (categoriaDesejada === '') {
            console.warn('A categoria desejada está vazia. Verifique se a categoria está sendo passada corretamente.');
            return;
        }

        const response = await fetch(`php/listar.php?categoria=${encodeURIComponent(categoriaDesejada)}`);
        const data = await response.json();
        console.log('Dados recebidos:', data);

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // Limpar figuras anteriores

        // Treina a cadeia de Markov com os títulos das figuras
        let text = data.map(figura => figura.palavra).join(' ');
        console.log('Texto para treinar MarkovChain:', text);
        markovChain.Load(text, wordImageMap);

        // Fazer predições com base na última palavra adicionada à frase
        let ultimaPalavra = figurasSelecionadas.length > 0 ? figurasSelecionadas[figurasSelecionadas.length - 1].palavra : '';
        let prediction = markovChain.Predict(ultimaPalavra);
        console.log('Predição com base na última palavra:', prediction);

        // Exibir figuras da categoria selecionada
        data.forEach(figura => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const imagePath = `./img/figuras/${encodeURIComponent(figura.imageFileName)}`;
            const fallbackImage = './img/figuras/'; // Caminho da imagem padrão para fallback

            const imgElement = loadImage(imagePath, fallbackImage);
            cardDiv.appendChild(imgElement);

            cardDiv.innerHTML += `
            <div class="card-body">
                <h5 class="card-title">${figura.palavra}</h5>
                <p>Categorias: ${figura.categorias || 'Nenhuma'}</p>
                <p>Predição: ${prediction.join(', ')}</p> <!-- Exibir as predições -->
            </div>`;
                
            // Adiciona evento para chamar a função de adicionar a figura à frase
            cardDiv.addEventListener('click', () => {
                adicionarFiguraAFrase(figura);
                cardDiv.classList.add('selected');
                setTimeout(() => {
                    cardDiv.classList.remove('selected');   // Cria efeito visual para indicar que o card foi selecionado
                }, 300);
            });

            cardsContainer.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar as figuras:', error);
    }
}

async function init() {
    const markovChain = new markovChain();
    const wordImageMap = {};
    const categorias = await carregarCategorias();
    criarBotoesDeCategoria(categorias, markovChain, wordImageMap);
}

document.addEventListener('DOMContentLoaded', init);

export { removerUltimaFigura, limparFrase, buscaFigura, criarBotoesDeCategoria };
