const sqlite3 = require('sqlite3').verbose();

class WordPredictionManager {
    constructor() {
        this.con = new sqlite3.Database(SQLDatabaseConfig.GetInstancia().GetConnection());
        this.mv = new MarkovChain();
        this.GetIdCorpus();
    }

    async GetIdCorpus() {
        const def = await con.table('Definicoes').toArray();
        const cps = await con.table('Corpus').toArray();
    

    if (def[0].IdCorpus === 0) {
        const cp = cps.find(sa => sa.id === 14);
        mv.load(cp.corpus.replace('\r', ' '));
        } else {
        const cp = cps.find(sa => sa.id === def.IdCorpus);
        if (!cp) {
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

    function getPrediction(palavra) {
        
        let _res_dicionario = [];
        
        let val;
        
        let gr = mv.Words.has(palavra);
        
        if (!gr) {
          return null;
        }
      
        let sgr = mv.getChilds(val);
      
        for (let ch of sgr) {
          let elem = getElementosDicionario(ch.Word);
          if (elem !== null) {
            _res_dicionario.push(elem);
          }
        }
      
        return _res_dicionario;
      }
      
      function getDicionario() {
        let j = "select Dicionario.* from Dicionario inner join Imagem on Imagem.idFigura = Dicionario.IdImagem";
        let g = con.query(j);
      
        for (let iii of g) {
          let gg = iii.Palavra;
        }
        listDicionario = g;
    }

    function getCategoriaSubMenu(word) {
        let j = " select * from Categoria where Sigla = '" + word + "'";
        let g = con.query(j); // Assuming con.query() is a function that executes SQL and returns an array of objects
        return g[0].idCategoria.toString();
    }
    
    function getDicionario(categoria) {
        let j = " select Dicionario.* from Dicionario inner join Imagem on Imagem.idFigura = Dicionario.IdImagem where idCategoria ='" + categoria + "'";
        let g = con.query(j); // Assuming con.query() is a function that executes SQL and returns an array of objects
        g.forEach(function(iii) {
            let gg = iii.Palavra;
        });
        return g;
    }
    
    function getElementosDicionario(pl) {
        for (let d of listDicionario) { // Assuming listDicionario is an array of Dicionario objects
            if (d.Palavra.toUpperCase() === pl.toUpperCase()) {
                return d;
            }
        }
        return null;
        }
    }
}