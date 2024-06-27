const fs = require('fs');

class MarkovChain {
    constructor() {
        this.firstPossibleWords = new Map();
        this.secondPossibleWords = new Map();
        this.transitions = new Map();
    }

    train(data) {
        const lines = data.split('\n');

        for (const line of lines) {
            const tokens = this.preprocessText(line);
            this.processTokens(tokens);
        }

        this.normalizeProbabilities();
    }

    preprocessText(text) {
        return text.trim()
            .toLowerCase()
            .replace(/[^\w\s]/g, '')  // Remove pontuação
            .split(/\s+/);
    }

    processTokens(tokens) {
        tokens.forEach((token, i) => {
            if (i === 0) {
                this.incrementMap(this.firstPossibleWords, token);
            } else {
                const prevToken = tokens[i - 1];
                if (i === tokens.length - 1) {
                    this.incrementMap(this.transitions, `${prevToken},${token}`, 'END');
                }
                if (i === 1) {
                    this.incrementMap(this.secondPossibleWords, prevToken, token);
                } else {
                    const prevPrevToken = tokens[i - 2];
                    this.incrementMap(this.transitions, `${prevPrevToken},${prevToken}`, token);
                }
            }
        });
    }

    incrementMap(map, key, value = 1) {
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(value);
    }

    normalizeProbabilities() {
        this.firstPossibleWords = this.calculateProbabilities(this.firstPossibleWords);
        this.secondPossibleWords = this.mapValues(this.secondPossibleWords, this.calculateProbabilities);
        this.transitions = this.mapValues(this.transitions, this.calculateProbabilities);
    }

    calculateProbabilities(map) {
        const total = Array.from(map.values()).reduce((sum, val) => sum + val.length, 0);
        return new Map(Array.from(map.entries()).map(([key, val]) => [key, val.length / total]));
    }

    mapValues(map, fn) {
        return new Map(Array.from(map.entries()).map(([key, val]) => [key, fn(new Map(val.map(v => [v, 1])))]));
    }

    nextWord(context) {
        if (typeof context === 'string') {
            return this.secondPossibleWords.get(context) || [];
        } else if (Array.isArray(context)) {
            return this.transitions.get(context.join(',')) || [];
        }
        return [];
    }
}

// Correspondência palavra-imagem
const wordToImage = {
    "gato": "Prancha/src/util/img/figuras/gato.jpg",
    "cachorro": "Prancha/src/util/img/figuras/cachorro.jpg",
    "peixe":"Prancha/src/util/img/figuras/peixe.jpg",
    "urso":"Prancha/src/util/img/figuras/urso.jpg",
    "boi":"Prancha/src/util/img/figuras/boi.jpg",
    "aceitar":"Prancha/src/util/img/figuras/aceitar.jpg",
    "comer": "Prancha/src/util/img/figuras/comer.jpg",
    "beber": "Prancha/src/util/img/figuras/beber.jpg",
    "abraçar":"Prancha/src/util/img/figuras/abraçar.jpg",
    "aproximar":"Prancha/src/util/img/figuras/aproximar.jpg",
    "visitar":"Prancha/src/util/img/figuras/visitar.jpg",
    "amarrar":"Prancha/src/util/img/figuras/amarrar.jpg",
    "abacaxi":"Prancha/src/util/img/figuras/abacaxi.jpg",
    "uva":"Prancha/src/util/img/figuras/uva.jpg",
    "banana":"Prancha/src/util/img/figuras/banana.jpg",
    "caju":"Prancha/src/util/img/figuras/caju.jpg",
    "laranja":"Prancha/src/util/img/figuras/laranja.jpg",
    "azul":"Prancha/src/util/img/figuras/azul.jpg",
    "branco":"Prancha/src/util/img/figuras/branco.jpg",
};

// Caminho para o arquivo de treinamento
const trainData = 'Prancha/src/util/corpus.txt';

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

    rl.on('line', (line) => {
        sent += ' ' + line;
        const tokens = markovChain.preprocessText(sent);
        let suggestions;
        if (tokens.length < 2) {
            suggestions = markovChain.nextWord(tokens[0]);
        } else {
            suggestions = markovChain.nextWord([tokens[tokens.length - 2], tokens[tokens.length - 1]]);
        }
        console.log(suggestions);
    });

    rl.on('close', () => {
        console.log('Programa terminado.');
    });
});

module.exports = MarkovChain;
