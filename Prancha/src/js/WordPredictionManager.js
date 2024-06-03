
class WordPredictionManager {
  constructor() {
      // Inicialização da cadeia de Markov
      this.mv = new MarkovChain();
      // Chamada para obter o ID do corpus e carregar os dados da cadeia de Markov
      this.getIdCorpus();
  }

    async getIdCorpus() {
        try {
          // Faz uma requisição para o endpoint PHP que retorna as definições e corpus
          const response = await fetch('./php/obter_definicoes_e_corpus.php');
          const data = await response.json();
          
          // Extrai os dados de definições e corpus
          const def = data.definicoes;
          const cp = data.corpus;
          
          // Verificação do ID do corpus e carregamento dos dados correspondentes
          if (def.IdCorpus === 0) {
              this.mv.load(cp.corpus.replace('\r', ' '));
          } else {
              // se quiser carregar um corpus espacifico
          }
      } catch (error) {
          console.error('Erro ao obter ID do corpus:', error);
      }
  }
  
  async getPrediction(palavra) {
      try {
          // Faz uma requisição para o endpoint PHP que retorna a predição de palavras
          const response = await fetch(`./php/obter_predicao.php?palavra=${palavra}`);
          const data = await response.json();
          
          let _res_dicionario = [];
          
          // Processa os dados da predição
          for (let ch of data) {
              let elem = await this.getElementosDicionario(ch.Word);
              if (elem !== null) {
                  _res_dicionario.push(elem);
              }
          }
          
          return _res_dicionario;
      } catch (error) {
          console.error('Erro ao obter predição de palavras:', error);
          return [];
      }
  }

  async getElementosDicionario(pl) {
      try {
          // Faz uma requisição para o endpoint PHP que retorna os elementos do dicionário
          const response = await fetch(`obter_elementos_dicionario.php?palavra=${pl}`);
          const data = await response.json();
          
          return data;
      } catch (error) {
          console.error('Erro ao obter elementos do dicionário:', error);
          return null;
      }
  }
}