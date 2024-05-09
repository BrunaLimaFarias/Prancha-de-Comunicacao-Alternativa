
window.onload = async function() {
    try {
        const response = await fetch("php/listar.php");
        const data = await response.json();

        const cardsContainer = document.getElementById('cards-container');

        data.forEach(figura => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card-figura');
            cardDiv.innerHTML = `
                <img src="${figura.img}" alt="${figura.titulo}">
                <h3>${figura.titulo}</h3>
            `;
            cardsContainer.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Erro ao carregar as figuras:', error);
    }
}




/*
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

*/