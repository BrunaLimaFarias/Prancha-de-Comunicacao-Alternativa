class MarkovChain {
  // Inicialização das propriedades da cadeia de Markov
  constructor() {
    this.NextIsStart = false; // Flag para indicar se a próxima palavra é o início de uma sentença
    this.Tokens = []; // Array para armazenar os tokens (palavras) do texto  
    this.startindex = []; // Array para armazenar os índices das palavras de início de sentença
    this.FSortWordsByFrequence = false; // Flag para indicar se as palavras devem ser classificadas por frequência
    this.Words = new Map(); // Mapa para armazenar as palavras e suas informações associadas 
  }

  // Método para obter os filhos de uma palavra
  MarkovChain() {
    this.Words = new Map();
    this.Tokens = [];
    let vv = "Nosso grupo vai conseguir entregar o trabalho";
    this.startindex = [];
}


getChilds(rootWord) {
  let listChilds = [...rootWord.childs]; // Obtenção dos filhos da palavra raiz
  listChilds.sort((x, y) => x.value.occurrence - y.value.occurrence); // Ordenação dos filhos com base na ocorrência
  let b = listChilds.map(wc => wc.value); // Mapeamento dos filhos ordenados para uma lista de objetos Child
  let d = b.sort((x, y) => y.occurrence - x.occurrence); // Ordenação da lista de objetos Child por ocorrência (decrescente)
  return d; // Retorno da lista de filhos ordenada
}

// Método para dividir o texto em tokens (palavras)
getListTokens(txt) {
  var list = [];
  var tks = txt.split(" "); // // Divisão do texto em tokens usando o espaço como delimitador
  for (var i = 0; i < tks.length; i++) { // Iteração sobre os tokens para adicionar à lista
    list.push(tks[i]);
  }
  return list; // Retorno da lista de tokens
}

// Método para carregar o texto na cadeia de Markov
Load(text) {
  let i;
  let s1;
  let w;
  let c;
  // Limpeza dos tokens e palavras existentes
  Words.clear();
  Tokens.clear();
  // Divisão do texto em tokens
  Tokens = getListTokens(text);
    // Iteração sobre os tokens
  for (i = 0; i < Tokens.length - 1; i++) {
      s1 = Tokens[i];
      // Verificação se o token é vazio
      if (s1 === "")
          continue;

      // Criação de um novo objeto para a palavra
      w = { Childs: new Map(), Occurrence: 0, ChildCount: 0 };
      c = {};
      // Verificação se a palavra já existe no mapa de palavras
      if (Words.has(s1)) {
          if (i < Tokens.length - 1) {
              w = Words.get(s1);
              // Atualização da ocorrência da palavra
              w.Occurrence += 1;
              if (i < Tokens.length - 1) {
                // Verificação se a próxima palavra é o início de uma sentença
                  if (NextIsStart) {
                      w.StartWord = true;
                      NextIsStart = false;
                      startindex.push(s1);
                  }
              }
              // Verificação se a próxima palavra já é um filho da palavra atual
              if (w.Childs.has(Tokens[i + 1])) {
                  c = w.Childs.get(Tokens[i + 1]);
                  c.Occurrence += 1;
                  w.Childs.delete(Tokens[i + 1]);
              } else {
                  c.Word = Tokens[i + 1];
                  c.Occurrence = 1;
              }
              // Atualização do número de filhos da palavra
              w.ChildCount += 1;
              w.Childs.set(Tokens[i + 1], c);
              // Remoção da palavra do mapa e adição da palavra atualizada
              Words.delete(s1);
              Words.set(s1, w);
          }
      } else {
          // Criação de uma nova palavra se ela não existir no mapa
          if (i === 0) {
              w.StartWord = true;
              startindex.push(s1);
          }
          w.Word = Tokens[i];
          w.Occurrence += 1;
          if (i < Tokens.length - 1) {
              c.Word = Tokens[i + 1];
              w.Occurrence += 1;
              w.Childs.set(Tokens[i + 1], c);
              w.ChildCount += 1;
          } else
              w.EndWord = true;
          // Verificação se a palavra é o final de uma sentença
          if (s1.substring(s1.length - 1) === ".") {
              w.EndWord = true;
              NextIsStart = true;
          } else if (NextIsStart) {
              w.StartWord = true;
              NextIsStart = false;
              startindex.push(s1);
          }
          // Adição da palavra ao mapa
          Words.set(s1, w);
        }
      }
    }
  }