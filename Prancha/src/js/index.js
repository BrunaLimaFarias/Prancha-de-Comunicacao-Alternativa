
window.onload = async function() {

    var promise = await fetch("php/listar.php", {

        method: "GET"

    });

    var dados = await promise.json();

    for(var i = 0; i < dados.length; i++){

        var conteudo =
        `
        
        <div class="card-figura">
        <button onclick="adicionarItem('${dados[i].titulo}')">
            <div class="img-figura">
                <img src="./img/${i}.jpg" alt="${dados[i].titulo}" width="51" height="200">
            </div>
            <div class="nome-figura">
                <h3>${dados[i].titulo}</h3>
            </div>
        </button>
    </div>
        `;

        document.getElementById('figura-frase').innerHTML += conteudo;
    }

} 

