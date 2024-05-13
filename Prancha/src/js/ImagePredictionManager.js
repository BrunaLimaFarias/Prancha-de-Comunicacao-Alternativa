import { PredictionManager } from './predictionManager.js'; // Importar a classe PredictionManager
class ImagePredictionManager extends PredictionManager {
    constructor(apiKey) {
        super(apiKey);
        this.markovChain = new MarkovChain();
    }

    // Método para carregar os dados da cadeia de Markov com base no corpus
    async loadMarkovChain(corpus) {
        // Carregar os dados da cadeia de Markov com base no corpus fornecido
        this.markovChain.load(corpus.replace('\r', ' '));
    }

    // Método para fazer a predição de imagens com base no contexto
    async fazerPredicaoImagens(palavra) {
        return new Promise((resolve, reject) => {
            // Verificar se a palavra está na cadeia de Markov
            if (!this.markovChain.Words.has(palavra)) {
                reject('A palavra fornecida não está na cadeia de Markov.');
                return;
            }

            // Obter os filhos da palavra na cadeia de Markov
            const childs = this.markovChain.getChilds(palavra);

            // Array para armazenar a predição de imagens
            const predictions = [];

            // Para cada filho, obter os elementos do dicionário
            for (const child of childs) {
                const elements = this.getElementosDicionario(child.Word);
                if (elements !== null) {
                    predictions.push(elements);
                }
            }

            resolve(predictions);
        });
    }
}

// Criar uma instância do ImagePredictionManager com a chave da API Geoapify
const imagePredictionManager = new ImagePredictionManager('afaaa54c319a4dba81f57014b11ffb57');

// Carregar a cadeia de Markov com base no corpus
imagePredictionManager.loadMarkovChain('corpus_de_imagens');

// Chamar o método para fazer a predição de imagens com base no contexto
imagePredictionManager.fazerPredicaoImagens('eu')
    .then(predictions => {
        console.log('Predições de imagens:', predictions);
    })
    .catch(error => {
        console.error('Erro ao fazer predição de imagens:', error);
    });