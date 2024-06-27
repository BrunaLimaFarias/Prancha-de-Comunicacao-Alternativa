const fs = require('fs');

class MarkovChain {
    constructor() {
        this.firstPossibleWords = {};
        this.secondPossibleWords = {};
        this.transitions = {};
    }

    // Método para treinar o modelo de Markov com os dados fornecidos
    train(data) {
        let lines = data.split('\n');

        for (let line of lines) {
            let tokens = line.trim().toLowerCase().split(/\s+/);
            let tokensLength = tokens.length;
            
            for (let i = 0; i < tokensLength; i++) {
                let token = tokens[i];
                
                if (i === 0) {
                    this.firstPossibleWords[token] = (this.firstPossibleWords[token] || 0) + 1; // Contagem de palavras iniciais
                } else {
                    let prevToken = tokens[i - 1];
                    
                    if (i === tokensLength - 1) {
                        this.expandDict(this.transitions, [prevToken, token].join(','), 'END'); // Marca o fim da sentença
                    }
                    
                    if (i === 1) {
                        this.expandDict(this.secondPossibleWords, prevToken, token); // Contagem de transições de primeira para segunda palavra
                    } else {
                        let prevPrevToken = tokens[i - 2];
                        this.expandDict(this.transitions, [prevPrevToken, prevToken].join(','), token); // Contagem de transições de palavras subsequentes
                    }
                }
            }
        }

        // Normalização das probabilidades
        let firstPossibleWordsTotal = Object.values(this.firstPossibleWords).reduce((a, b) => a + b, 0);
        for (let [key, value] of Object.entries(this.firstPossibleWords)) {
            this.firstPossibleWords[key] = value / firstPossibleWordsTotal;
        }

        for (let [prevWord, nextWordList] of Object.entries(this.secondPossibleWords)) {
            this.secondPossibleWords[prevWord] = this.getNextProbability(nextWordList);
        }

        for (let [wordPair, nextWordList] of Object.entries(this.transitions)) {
            this.transitions[wordPair] = this.getNextProbability(nextWordList);
        }
    }

    // Método auxiliar para expandir o dicionário com novos itens
    expandDict(dictionary, key, value) {
        if (!(key in dictionary)) {
            dictionary[key] = [];
        }
        dictionary[key].push(value);
    }

    // Método para calcular as probabilidades das palavras seguintes
    getNextProbability(givenList) {
        let probabilityDict = {};
        let givenListLength = givenList.length;
        
        for (let item of givenList) {
            probabilityDict[item] = (probabilityDict[item] || 0) + 1;
        }
        
        for (let [key, value] of Object.entries(probabilityDict)) {
            probabilityDict[key] = value / givenListLength;
        }
        
        return probabilityDict;
    }

    // Método para prever a próxima palavra com base no contexto fornecido
    nextWord(tpl) {
        if (typeof tpl === 'string') {
            let d = this.secondPossibleWords[tpl];
            if (d !== undefined) {
                return Object.keys(d); // Retorna as palavras possíveis que podem seguir a palavra dada
            }
        } else if (Array.isArray(tpl)) {
            let d = this.transitions[tpl.join(',')];
            if (d !== undefined) {
                return Object.keys(d); // Retorna as palavras possíveis que podem seguir o par de palavras dado
            }
        }
        return [];
    }
}

// Caminho para o arquivo de treinamento
let trainData = './src/util/corpus.txt';

// Leitura do arquivo e treinamento do modelo
fs.readFile(trainData, 'utf8', (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return;
    }

    const markovChain = new MarkovChain();
    markovChain.train(data);

    console.log("Uso: comece a digitar... o programa irá sugerir palavras.\n");

    // Configuração para interação com o usuário via console
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let sent = '';
    let lastSuggestion = [];

    rl.on('line', (line) => {
        sent += ' ' + line;
        let tokens = sent.trim().split(/\s+/);
        
        if (tokens.length < 2) {
            lastSuggestion = markovChain.nextWord(tokens[0].toLowerCase());
            console.log(lastSuggestion);
        } else {
            lastSuggestion = markovChain.nextWord([tokens[tokens.length - 2].toLowerCase(), tokens[tokens.length - 1].toLowerCase()]);
            console.log(lastSuggestion);
        }
    });

    rl.on('close', () => {
        console.log('Programa terminado.');
    });
});

module.exports = MarkovChain;
