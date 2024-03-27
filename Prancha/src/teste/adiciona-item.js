function adicionarItem(item) {
    var listaFrase = document.getElementById('lista-frase');
    var novoItem = document.createElement('li');
    novoItem.textContent = item;
    listaFrase.appendChild(novoItem);
}
