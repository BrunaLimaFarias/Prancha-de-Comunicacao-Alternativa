const sqlite3 = require('sqlite3').verbose();

class WordPredictionManager {
    constructor() {
        // Inicialização da conexão com o banco de dados SQLite
        this.con = new sqlite3.Database(SQLDatabaseConfig.GetInstancia().GetConnection());
        // Inicialização da cadeia de Markov
        this.mv = new MarkovChain();
        // Chamada para obter o ID do corpus e carregar os dados da cadeia de Markov
        this.GetIdCorpus();
    }

    async GetIdCorpus() {
        // Obtenção das definições e corpus do banco de dados
        const def = await con.table('Definicoes').toArray();
        const cps = await con.table('Corpus').toArray();
    
    // Verificação do ID do corpus e carregamento dos dados correspondentes
    if (def[0].IdCorpus === 0) {
        const cp = cps.find(sa => sa.id === 14);
        mv.load(cp.corpus.replace('\r', ' '));
        } else {
        const cp = cps.find(sa => sa.id === def.IdCorpus);
        if (!cp) {
            // Carregamento do corpus padrão caso não haja definição específica
            // await page.displayAlert('Aviso', 'O Corpus definido como padrão não esta mais disponível. Será utilizado o Corpus padrão da ferrameta. Para alterar utilize a interface de Definições da Prancha.', 'Ok');
            const defaultCp = cps.find(sa => sa.id === 14);
            getDicionario();
            mv.load(defaultCp.corpus.replace('\r', ' '));
            getPrediction('eu');
          } else {
            getDicionario();
            mv.load(cp.corpus.replace('\r', ' '));
            getPrediction('eu');
        }
    }
    // Método para realizar a predição de palavras
    function getPrediction(palavra) {
        
        let _res_dicionario = [];
        
        let val;

        // Verifica se a palavra está na cadeia de Markov
        let gr = mv.Words.has(palavra);
        
        if (!gr) {
          return null;
        }
        
        // Obtém os filhos da palavra na cadeia de Markov
        let sgr = mv.getChilds(val);
      
        // Para cada filho, obtém os elementos do dicionário
        for (let ch of sgr) {
          let elem = getElementosDicionario(ch.Word);
          if (elem !== null) {
            _res_dicionario.push(elem);
          }
        }
      
        return _res_dicionario;
      }
      
      // Método para obter os elementos do dicionário do banco de dados
      function getDicionario() {
        let j = "select Dicionario.* from Dicionario inner join Imagem on Imagem.idFigura = Dicionario.IdImagem";
        let g = con.query(j);
      
        // Itera sobre os resultados da consulta e armazena no array listDicionario
        for (let iii of g) {
          let gg = iii.Palavra;
        }
        listDicionario = g;
    }

    // Método para obter a categoria do submenu
    function getCategoriaSubMenu(word) {
        let j = " select * from Categoria where Sigla = '" + word + "'";
        let g = con.query(j); // Assuming con.query() is a function that executes SQL and returns an array of objects
        return g[0].idCategoria.toString();
    }
    
    // Método para obter o dicionário com base na categoria
    function getDicionario(categoria) {
        let j = " select Dicionario.* from Dicionario inner join Imagem on Imagem.idFigura = Dicionario.IdImagem where idCategoria ='" + categoria + "'";
        let g = con.query(j); // Assuming con.query() is a function that executes SQL and returns an array of objects
        // Itera sobre os resultados da consulta e retorna o array de objetos
        g.forEach(function(iii) {
            let gg = iii.Palavra;
        });
        return g;
    }
    
    // Método para obter os elementos do dicionário com base na palavra
    function getElementosDicionario(pl) {
      // Itera sobre o array listDicionario e retorna o objeto correspondente à palavra
        for (let d of listDicionario) { // Assuming listDicionario is an array of Dicionario objects
            if (d.Palavra.toUpperCase() === pl.toUpperCase()) {
                return d;
            }
        }
        return null;
        }
    }
}