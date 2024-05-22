window.onload = function() {
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            loadFigures(selectedCategory);
        });
    });
};

async function loadFigures(categoriaDesejada) {
    try {
        // Fazer a requisição ao PHP com a categoria selecionada
        const response = await fetch(`php/listar.php?categoria=${encodeURIComponent(categoriaDesejada)}`);
        const data = await response.json();
        console.log('Dados recebidos:', data); // Debug: verifique se os dados estão sendo recebidos corretamente

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = ''; // Limpar figuras anteriores

        // Exibir figuras da categoria selecionada
        data.forEach(figura => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
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
                    cardDiv.classList.remove('selected');   // Cria efeito visual temporário para indicar que o card foi selecionado
                }, 300);
            });

            cardsContainer.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar as figuras:', error);
    }
}

