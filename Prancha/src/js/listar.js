
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
