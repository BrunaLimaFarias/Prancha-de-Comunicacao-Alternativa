const fs = require('fs'); // Importa o módulo de sistema de arquivos

let trainData = 'Prancha/src/util/corpus.txt'; // Caminho atualizado para o arquivo de texto contendo o corpus de treinamento

let firstPossibleWords = {}; // Dicionário para armazenar palavras possíveis no início das sentenças
let secondPossibleWords = {}; // Dicionário para armazenar as palavras que podem seguir a primeira palavra
let transitions = {}; // Dicionário para armazenar as transições de palavras (pares de palavras para a próxima palavra)

function expandDict(dictionary, key, value) {
    // Adiciona o valor ao array associado à chave no dicionário
    if (!(key in dictionary)) {
        dictionary[key] = [];
    }
    dictionary[key].push(value);
}

function getNextProbability(givenList) {
    // Calcula a probabilidade das palavras na lista fornecida
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

function trainMarkovModel(data) {
    // Função que treina o modelo de Markov usando os dados fornecidos
    let lines = data.split('\n'); // Divide os dados em linhas
    for (let line of lines) {
        let tokens = line.trim().toLowerCase().split(/\s+/); // Divide a linha em tokens (palavras)
        let tokensLength = tokens.length;
        for (let i = 0; i < tokensLength; i++) {
            let token = tokens[i];
            if (i === 0) {
                firstPossibleWords[token] = (firstPossibleWords[token] || 0) + 1; // Conta palavras iniciais
            } else {
                let prevToken = tokens[i - 1];
                if (i === tokensLength - 1) {
                    expandDict(transitions, [prevToken, token].join(','), 'END'); // Marca fim da sentença
                }
                if (i === 1) {
                    expandDict(secondPossibleWords, prevToken, token); // Conta transições de primeira para segunda palavra
                } else {
                    let prevPrevToken = tokens[i - 2];
                    expandDict(transitions, [prevPrevToken, prevToken].join(','), token); // Conta transições de palavras subsequentes
                }
            }
        }
    }

    let firstPossibleWordsTotal = Object.values(firstPossibleWords).reduce((a, b) => a + b, 0);
    for (let [key, value] of Object.entries(firstPossibleWords)) {
        firstPossibleWords[key] = value / firstPossibleWordsTotal; // Normaliza as probabilidades das primeiras palavras
    }

    for (let [prevWord, nextWordList] of Object.entries(secondPossibleWords)) {
        secondPossibleWords[prevWord] = getNextProbability(nextWordList); // Calcula probabilidades de transições de segunda palavra
    }

    for (let [wordPair, nextWordList] of Object.entries(transitions)) {
        transitions[wordPair] = getNextProbability(nextWordList); // Calcula probabilidades de transições subsequentes
    }
}

function nextWord(tpl) {
    // Função que sugere a próxima palavra com base no template fornecido (string ou array)
    if (typeof tpl === 'string') {
        let d = secondPossibleWords[tpl];
        if (d !== undefined) {
            return Object.keys(d); // Retorna as palavras possíveis que podem seguir a palavra dada
        }
    } else if (Array.isArray(tpl)) {
        let d = transitions[tpl.join(',')];
        if (d !== undefined) {
            return Object.keys(d); // Retorna as palavras possíveis que podem seguir o par de palavras dado
        }
    }
    return [];
}

// Lê o arquivo de texto e treina o modelo
fs.readFile(trainData, 'utf8', (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo:", err);
        return;
    }
    trainMarkovModel(data); // Treina o modelo com os dados lidos

    console.log("Uso: comece a digitar.. o programa irá sugerir palavras.\n");

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
            lastSuggestion = nextWord(tokens[0].toLowerCase());
            console.log(lastSuggestion);
        } else {
            lastSuggestion = nextWord([tokens[tokens.length - 2].toLowerCase(), tokens[tokens.length - 1].toLowerCase()]);
            console.log(lastSuggestion);
        }
    });

    rl.on('close', () => {
        console.log('Programa terminado.');
    });
});
