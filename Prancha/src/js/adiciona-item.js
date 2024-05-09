function adicionarItem(item) {
    var listaFrase = document.getElementById('figura-frase');
    var novoItem = document.createElement('li');
    novoItem.textContent = item;
    listaFrase.appendChild(novoItem);
}
