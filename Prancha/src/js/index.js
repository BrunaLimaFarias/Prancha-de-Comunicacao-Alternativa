// js/index.js

import { MarkovChain } from './markovChain.js';
import { removerUltimaFigura, limparFrase, buscaFigura, criarBotoesDeCategoria } from './figuras.js';

let markovChain = new MarkovChain();
let wordImageMap = {};

window.onload = async function() {
    console.log('JavaScript carregado');

    try {
        // Fetch para obter as categorias disponíveis
        const response = await fetch('php/obter_categorias.php');
        const categorias = await response.json();

        // Chama a função para criar os botões de categoria dinamicamente
        criarBotoesDeCategoria(categorias, markovChain, wordImageMap);

        // Chamada inicial para buscar as figuras do banco de dados e gerar os cards
        buscaFigura('', markovChain, wordImageMap);
    } catch (error) {
        console.error('Erro ao carregar as categorias:', error);
    }
};

// Event listener para clicar no botão de exclusão da última figura
document.getElementById('btn-excluir-ultima').addEventListener('click', () => {
    removerUltimaFigura();
});

// Event listener para clicar no botão de limpar a frase
document.getElementById('btn-limpar-frase').addEventListener('click', () => {
    limparFrase();
});
