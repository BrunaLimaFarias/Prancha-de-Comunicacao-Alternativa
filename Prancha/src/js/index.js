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
        console.log('Categorias recebidas:', categorias);

        // Chama a função para criar os botões de categoria dinamicamente
        criarBotoesDeCategoria(categorias, markovChain, wordImageMap);

        // Chamada inicial para buscar as figuras da primeira categoria se houver
        if (categorias.length > 0) {
            const primeiraCategoria = categorias[0];
            console.log(`Buscando figuras para a categoria inicial: ${primeiraCategoria}`);
            await buscaFigura(primeiraCategoria, markovChain, wordImageMap);
        } else {
            console.warn('Nenhuma categoria disponível.');
        }
    } catch (error) {
        console.error('Erro ao carregar as categorias:', error);
    }
};

window.addEventListener('scroll', function() {
    const fraseLista = document.getElementById('frase-lista');
    if (window.scrollY > 100) { // Ajuste o valor conforme necessário
        fraseLista.classList.add('show');
    } else {
        fraseLista.classList.remove('show');
    }
});

// Event listener para clicar no botão de exclusão da última figura
document.getElementById('btn-excluir-ultima').addEventListener('click', () => {
    removerUltimaFigura();
});

// Event listener para clicar no botão de limpar a frase
document.getElementById('btn-limpar-frase').addEventListener('click', () => {
    limparFrase();
});