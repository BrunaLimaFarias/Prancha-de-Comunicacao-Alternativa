class HiddenMarkovModel {
    constructor(states, observations, transitionProbabilities, emissionProbabilities, initialProbabilities) {
        this.states = states; // Estados ocultos
        this.observations = observations; // Observações
        this.transitionProbabilities = transitionProbabilities; // Probabilidades de transição
        this.emissionProbabilities = emissionProbabilities; // Probabilidades de emissão
        this.initialProbabilities = initialProbabilities; // Probabilidades iniciais
    }

    // Método para fazer a predição da próxima observação dado o estado atual
    predictNextObservation(currentState) {
        const emissionProb = this.emissionProbabilities[currentState];
        const random = Math.random();
        let cumulativeProbability = 0;
        for (const observation in emissionProb) {
            cumulativeProbability += emissionProb[observation];
            if (random <= cumulativeProbability) {
                return observation; // Retorna a próxima observação prevista
            }
        }
    }

    // Método para fazer a predição de uma sequência de observações
    predictSequenceOfObservations(startState, numObservations) {
        let currentState = startState;
        const sequence = [];
        for (let i = 0; i < numObservations; i++) {
            const nextObservation = this.predictNextObservation(currentState);
            sequence.push(nextObservation);
            currentState = this.predictNextState(currentState);
        }
        return sequence;
    }

    // Método auxiliar para predizer o próximo estado com base no estado atual
    predictNextState(currentState) {
        const transitionProb = this.transitionProbabilities[currentState];
        const random = Math.random();
        let cumulativeProbability = 0;
        for (const nextState in transitionProb) {
            cumulativeProbability += transitionProb[nextState];
            if (random <= cumulativeProbability) {
                return nextState; // Retorna o próximo estado previsto
            }
        }
    }
}

// Exemplo de uso
const states = ['State1', 'State2', 'State3']; // Estados ocultos
const observations = ['Observation1', 'Observation2', 'Observation3']; // Observações
const transitionProbabilities = {
    'State1': {'State1': 0.5, 'State2': 0.3, 'State3': 0.2},
    'State2': {'State1': 0.2, 'State2': 0.6, 'State3': 0.2},
    'State3': {'State1': 0.3, 'State2': 0.4, 'State3': 0.3}
}; // Probabilidades de transição
const emissionProbabilities = {
    'State1': {'Observation1': 0.4, 'Observation2': 0.3, 'Observation3': 0.3},
    'State2': {'Observation1': 0.2, 'Observation2': 0.5, 'Observation3': 0.3},
    'State3': {'Observation1': 0.3, 'Observation2': 0.4, 'Observation3': 0.3}
}; // Probabilidades de emissão
const initialProbabilities = {'State1': 0.4, 'State2': 0.3, 'State3': 0.3}; // Probabilidades iniciais

// Criar o modelo HMM
const hmm = new HiddenMarkovModel(states, observations, transitionProbabilities, emissionProbabilities, initialProbabilities);

// Predizer uma sequência de observações começando de um estado inicial
const startState = 'State1';
const numObservations = 5;
const predictedSequence = hmm.predictSequenceOfObservations(startState, numObservations);
console.log('Sequência de observações prevista:', predictedSequence);