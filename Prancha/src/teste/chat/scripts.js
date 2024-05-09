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

// Função para atualizar a exibição da lista de figuras selecionadas
function atualizarFraseFormada() {
    const fraseElement = document.getElementById('frase-formada');
    fraseElement.innerHTML = ''; // Limpa a lista antes de atualizar
    figurasSelecionadas.forEach(figura => {
        const li = document.createElement('li');
        li.textContent = figura;
        fraseElement.appendChild(li);
    });
}

// Event listener para clicar em um card e adicionar à lista de figuras selecionadas
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(event) {
        const figuraClicada = event.currentTarget.dataset.figura; // Obtém o valor do atributo data-figura
        adicionarFiguraAFrase(figuraClicada);
    });
});

// Event listener para clicar no botão de exclusão da última figura
document.getElementById('btn-excluir-ultima').addEventListener('click', function() {
    removerUltimaFigura();
});
