// js/index.js

import { MarkovChain } from './markovChain.js';
import { adicionarFiguraAFrase, removerUltimaFigura, limparFrase, buscaFigura } from './figuras.js';

let markovChain = new MarkovChain();
let wordImageMap = {};

window.onload = function() {
    console.log('JavaScript carregado');
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            buscaFigura(selectedCategory, markovChain, wordImageMap);
        });
    });

    // Chamada inicial para buscar as figuras do banco de dados e gerar os cards
    buscaFigura('', markovChain, wordImageMap);
};

// Event listener para clicar no botão de exclusão da última figura
document.getElementById('btn-excluir-ultima').addEventListener('click', () => {
    removerUltimaFigura();
});

// Event listener para clicar no botão de limpar a frase
document.getElementById('btn-limpar-frase').addEventListener('click', () => {
    limparFrase();
});
