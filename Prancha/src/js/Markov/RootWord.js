class RootWord {
    constructor() {
        // Inicialização das propriedades de uma instância RootWord
        this.StartWord = false; // Indica se a palavra é o início de uma sentença
        this.EndWord = false; // Indica se a palavra é o final de uma sentença
        this.Word = ''; // A própria palavra
        this.Occurrence = 0; // Número de ocorrências da palavra na cadeia de Markov
        this.ChildCount = 0; // Número de filhos da palavra na cadeia de Markov
        this.Childs = 0; // Mapa de filhos da palavra, onde as chaves são as palavras e os valores são instâncias da classe Child
    }
}