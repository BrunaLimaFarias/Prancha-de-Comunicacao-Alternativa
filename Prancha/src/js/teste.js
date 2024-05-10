async function atualizarFraseFormada() {
    try {
        const response = await fetch("php/listar.php");
        const data = await response.json();
        const fraseListaElement = document.getElementById('frase-lista');
        fraseListaElement.innerHTML = ''; // Limpa a lista antes de atualizar

            
        // Percorre a lista de figuras selecionadas e cria elementos para exibir cada uma delas
        data.forEach(figura => {
            const li = document.createElement('li');
            li.setAttribute('data-figura', figura); // Definir o atributo data-figura
                li.innerHTML = `
                    <img src="${figura.img}" alt="${figura.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${figura.titulo}</h5>
                    </div>`
                    fraseListaElement.appendChild(li);
        });
    }catch (error) {
        console.error('Erro ao buscar figuras:', error);
    }
}

// Função para atualizar a exibição da lista de figuras selecionadas
function atualizarFraseFormada() {
    const fraseListaElement = document.getElementById('frase-lista');
    fraseListaElement.innerHTML = ''; // Limpa a lista antes de atualizar

    // Percorre a lista de figuras selecionadas e cria elementos para exibir cada uma delas
    figurasSelecionadas.forEach(figura => {
        const li = document.createElement('li');
        
        li.innerHTML = `
                    <img src="${figura.img}" alt="${figura}">
                    <div class="card-body">
                        <h5 class="card-title">${figura}</h5>
                    </div>`
        fraseListaElement.appendChild(li);
    });
}