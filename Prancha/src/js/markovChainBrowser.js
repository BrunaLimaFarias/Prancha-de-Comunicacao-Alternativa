let firstPossibleWords = {};
let secondPossibleWords = {};
let transitions = {};

function expandDict(dictionary, key, value) {
    if (!(key in dictionary)) {
        dictionary[key] = [];
    }
    dictionary[key].push(value);
}

function getNextProbability(givenList) {
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
    let lines = data.split('\n');
    for (let line of lines) {
        let tokens = line.trim().toLowerCase().split(/\s+/);
        let tokensLength = tokens.length;
        for (let i = 0; i < tokensLength; i++) {
            let token = tokens[i];
            if (i === 0) {
                firstPossibleWords[token] = (firstPossibleWords[token] || 0) + 1;
            } else {
                let prevToken = tokens[i - 1];
                if (i === tokensLength - 1) {
                    expandDict(transitions, [prevToken, token].join(','), 'END');
                }
                if (i === 1) {
                    expandDict(secondPossibleWords, prevToken, token);
                } else {
                    let prevPrevToken = tokens[i - 2];
                    expandDict(transitions, [prevPrevToken, prevToken].join(','), token);
                }
            }
        }
    }

    let firstPossibleWordsTotal = Object.values(firstPossibleWords).reduce((a, b) => a + b, 0);
    for (let [key, value] of Object.entries(firstPossibleWords)) {
        firstPossibleWords[key] = value / firstPossibleWordsTotal;
    }

    for (let [prevWord, nextWordList] of Object.entries(secondPossibleWords)) {
        secondPossibleWords[prevWord] = getNextProbability(nextWordList);
    }

    for (let [wordPair, nextWordList] of Object.entries(transitions)) {
        transitions[wordPair] = getNextProbability(nextWordList);
    }
}

function nextWord(tpl) {
    if (typeof tpl === 'string') {
        let d = secondPossibleWords[tpl];
        if (d !== undefined) {
            return Object.keys(d);
        }
    } else if (Array.isArray(tpl)) {
        let d = transitions[tpl.join(',')];
        if (d !== undefined) {
            return Object.keys(d);
        }
    }
    return [];
}

function loadAndTrain(data) {
    trainMarkovModel(data);
}

export { loadAndTrain, nextWord };
