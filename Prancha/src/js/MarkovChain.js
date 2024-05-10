class MarkovChain {
  constructor() {
    this.NextIsStart = false;
    this.Tokens = [];
    this.startindex = [];
    this.FSortWordsByFrequence = false;
    this.Words = new Map();
  }

  MarkovChain() {
    this.Words = new Map();
    this.Tokens = [];
    let vv = "Nosso grupo vai conseguir entregar o trabalho";
    this.startindex = [];
}

getChilds(rootWord) {
  let listChilds = [...rootWord.childs];
  listChilds.sort((x, y) => x.value.occurrence - y.value.occurrence);
  let b = listChilds.map(wc => wc.value);
  let d = b.sort((x, y) => y.occurrence - x.occurrence);
  return d;
}


getListTokens(txt) {
  var list = [];
  var tks = txt.split(" ");
  for (var i = 0; i < tks.length; i++) {
    list.push(tks[i]);
  }
  return list;
}

Load(Text) {
    let i;
    let s1;
    let w;
    let c;
    Words.clear();
    Tokens.clear();
    Tokens = getListTokens(Text);
    for (i = 0; i < Tokens.length - 1; i++) {
      s1 = Tokens[i];
      if (s1 === '') {
        continue;
      }
      w = {
        StartWord: false,
        EndWord: false,
        Word: "",
        Occurrence: 0,
        ChildCount: 0,
        Childs: new Map()
      };

      c = {};
      if (Words.has(s1)) {
        if (i < Tokens.length - 1) {
          w = Words.get(s1);
          w.Occurrence = w.Occurrence + 1;
          if (i < Tokens.length - 1) {
            if (NextIsStart) {
                w.StartWord = true;
                NextIsStart = false;
                startindex.push(s1);
              }
              
              if (w.Childs.hasOwnProperty(Tokens[i + 1])) {
                c = w.Childs.get[Tokens[i + 1]];
                c.Occurrence++;
                delete w.Childs[Tokens[i + 1]];
              } else {
                c.Word = Tokens[i + 1];
                c.Occurrence = 1;
              }
              
              w.ChildCount++;
              w.Childs[Tokens[i + 1]] = c;
              Words.delete(s1);
              Words.set(s1, w);
              
            }
            else {
                if (i === 0) {
                  w.StartWord = true;
                  startindex.push(s1);
                }
                w.Word = Tokens[i];
                w.Occurrence = w.Occurrence + 1;
                if (i < Tokens.length - 1) {
                  c.Word = Tokens[i + 1];
                  w.Occurrence = w.Occurrence + 1;
                  w.Childs.set(Tokens[i + 1], c);
                  w.ChildCount = w.ChildCount + 1;
                } else {
                  w.EndWord = true;
                }
                if (s1.substring(s1.length - 1, s1.length) === ".") {
                  w.EndWord = true;
                  NextIsStart = true;
                } else if (NextIsStart) {
                  w.StartWord = true;
                  NextIsStart = false;
                  startindex.push(s1);
                }
                Words.set(s1, w);
            }

        }      
            }
          }
        }
      }