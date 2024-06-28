const googleApiKey = 'AIzaSyA25TyRbuYauUv9XylAv-e_yUzbSedJ0Tg'; 

// Mapeamento de cidade para estado 
const cityToStateMap = {
    "Curitiba": "Paraná",
    "São Paulo": "São Paulo",
    "Rio de Janeiro": "Rio de Janeiro",
    // Adicione mais mapeamentos de cidade para estado conforme necessário
};

// Variáveis globais para armazenar perfis de usuários
let perfisUsuarios = []; // Lista de perfis de usuários salvos
let perfilAtivo = null; // Perfil de usuário atualmente ativo

// Função para adicionar um novo perfil de usuário
function adicionarPerfil(nome) {
    // Verifica se o perfil já existe
    const perfilExistente = perfisUsuarios.find(perfil => perfil.nome === nome);
    if (perfilExistente) {
        alert(`O perfil '${nome}' já existe.`);
        return;
    }

    // Cria um novo perfil e o adiciona à lista de perfis
    const novoPerfil = {
        nome: nome.trim(),
    };

    perfisUsuarios.push(novoPerfil);

    // Define o novo perfil como ativo se nenhum perfil estiver ativo
    if (!perfilAtivo) {
        perfilAtivo = novoPerfil;
        atualizarPerfilSalvo();
    }

    // Atualiza a interface com o novo perfil salvo
    atualizarPerfisSalvos();
    limparFormulario();
}

// Função para atualizar a exibição do perfil salvo na interface
function atualizarPerfilSalvo() {
    const perfilSalvoElement = document.getElementById('perfil-salvo');
    perfilSalvoElement.textContent = `Perfil Atual: ${perfilAtivo.nome}`;
}

// Função para atualizar a lista de perfis salvos na interface
function atualizarPerfisSalvos() {
    const selectPerfilElement = document.getElementById('select-perfil');
    selectPerfilElement.innerHTML = '';
    perfisUsuarios.forEach(perfil => {
        const option = document.createElement('option');
        option.textContent = perfil.nome;
        selectPerfilElement.appendChild(option);
    });
}

// Função para limpar o formulário de entrada de nome
function limparFormulario() {
    document.getElementById('nome').value = '';
}

// Função para trocar o perfil atual
function trocarPerfil(nomePerfil) {
    const perfilSelecionado = perfisUsuarios.find(perfil => perfil.nome === nomePerfil);
    if (perfilSelecionado) {
        perfilAtivo = perfilSelecionado;
        atualizarPerfilSalvo();
    } else {
        alert(`O perfil '${nomePerfil}' não foi encontrado.`);
    }
}

// Função para apagar um perfil
function apagarPerfil(nomePerfil) {
    const index = perfisUsuarios.findIndex(perfil => perfil.nome === nomePerfil);
    if (index !== -1) {
        perfisUsuarios.splice(index, 1);
        if (perfilAtivo && perfilAtivo.nome === nomePerfil) {
            perfilAtivo = null;
            atualizarPerfilSalvo();
        }
        atualizarPerfisSalvos();
    } else {
        alert(`O perfil '${nomePerfil}' não foi encontrado.`);
    }
}

// Função para obter a localização do usuário usando a API de Geolocalização do Google
async function getGeolocationFromGoogle() {
    try {
        const geolocationUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`;

        const response = await fetch(geolocationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        const data = await response.json();
        if (data && data.location) {
            return {
                latitude: data.location.lat,
                longitude: data.location.lng
            };
        } else {
            throw new Error('Não foi possível obter coordenadas do Google Geolocation API.');
        }
    } catch (error) {
        console.error('Erro ao obter localização do Google Geolocation API:', error);
        throw error;
    }
}

// Função provisória para traduzir termos para português
function traduzirTermo(termo) {
    const translations = {
        house: 'casa',
        apartment: 'apartamento',
        'Federal District': 'Distrito Federal',
        'New York': 'Nova Iorque',
        'United States': 'Estados Unidos',
        // Adicionar outras traduções conforme necessário
    };
    return translations[termo] || termo;
}

// Função para obter o endereço detalhado usando a API de Reverse Geocoding do OpenStreetMap
async function getEnderecoDetalhado(latitude, longitude) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
        const data = await response.json();

        if (data && data.address) {
            const endereco = traduzirTermo(data.address.road) || 'Desconhecido';
            const bairro = traduzirTermo(data.address.suburb) || 'Desconhecido';
            const cidade = traduzirTermo(data.address.city) || data.address.town || 'Desconhecido';
            const estado = traduzirTermo(data.address.state) || 'Desconhecido';
            const pais = traduzirTermo(data.address.country) || 'Desconhecido';
            const type = traduzirTermo(data.type) || 'Desconhecido';

            return { type, endereco, bairro, cidade, estado, pais };
        } else {
            throw new Error('Dados de endereço incompletos ou inválidos.');
        }
    } catch (error) {
        console.error('Erro ao obter endereço detalhado do OpenStreetMap:', error);
        throw error;
    }
}

// Função para obter o período do dia com base no horário atual
function getPeriodoDia() {
    const horaAtual = new Date().getHours();
    if (horaAtual >= 5 && horaAtual < 12) {
        return 'manhã';
    } else if (horaAtual >= 12 && horaAtual < 18) {
        return 'tarde';
    } else {
        return 'noite';
    }
}

// Função para fazer a predição com base no contexto de tempo e geolocalização
async function fazerPredicao() {
    try {
        const periodoDia = getPeriodoDia();

        // Obtém a localização inicial do Google Geolocation API
        const coordenadas = await getGeolocationFromGoogle();
        const enderecoDetalhado = await getEnderecoDetalhado(coordenadas.latitude, coordenadas.longitude);

        // Saída da predição com base no contexto e perfil do usuário
        const predicao = `Usuário está num(a) ${enderecoDetalhado.type} na cidade de ${enderecoDetalhado.cidade}, ${enderecoDetalhado.estado}, ${enderecoDetalhado.pais}, no bairro ${enderecoDetalhado.bairro}, endereço ${enderecoDetalhado.endereco}, durante a ${periodoDia}. Perfil: ${perfilAtivo ? perfilAtivo.nome : 'Nenhum'}`;

        // Atualizar o conteúdo do elemento HTML com a predição
        const predicaoTextoElement = document.getElementById('predicao-texto');
        predicaoTextoElement.textContent = predicao;

        // Limpar o conteúdo anterior das ações comuns
        const acoesComunsElement = document.getElementById('acoes-comuns');
        acoesComunsElement.innerHTML = '';

        if (periodoDia === 'manhã') {
            // Adicionar mensagem sobre ações comuns durante a manhã
            const mensagem = document.createElement('p');
            mensagem.textContent ='Ações comuns durante a manhã: Café da manhã, preparativos para o dia.';
            acoesComunsElement.appendChild(mensagem);
        } else if (periodoDia === 'tarde') {
            // Adicionar mensagem sobre ações comuns durante a tarde
            const mensagem = document.createElement('p');
            mensagem.textContent =
                'Ações comuns durante a tarde: Almoço, trabalho ou estudos.';
            acoesComunsElement.appendChild(mensagem);
        } else {
            // Adicionar mensagem sobre ações comuns durante a noite
            const mensagem = document.createElement('p');
            mensagem.textContent =
                'Ações comuns durante a noite: Jantar, relaxamento, sono.';
            acoesComunsElement.appendChild(mensagem);
        }
    } catch (error) {
        console.error('Erro ao fazer predição:', error);
        throw error;
    }
}

// Função para atualizar o texto da predição no HTML
function atualizarPredicaoTexto(texto) {
    document.getElementById('predicao-texto').textContent = texto;
}

// Evento de clique no botão 'Fazer Predição'
document.getElementById('btn-fazer-predicao').addEventListener('click', fazerPredicao);

// Evento de clique no botão 'Salvar Perfil'
document.getElementById('btn-salvar-perfil').addEventListener('click', function() {
    const nomeUsuario = document.getElementById('nome').value;
    adicionarPerfil(nomeUsuario);
});

// Evento de clique no botão 'Trocar Perfil'
document.getElementById('btn-trocar-perfil').addEventListener('click', function() {
    const selectPerfilElement = document.getElementById('select-perfil');
    const nomePerfilSelecionado = selectPerfilElement.value;
    trocarPerfil(nomePerfilSelecionado);
});

// Evento de clique no botão 'Apagar Perfil'
document.getElementById('btn-apagar-perfil').addEventListener('click', function() {
    const selectPerfilElement = document.getElementById('select-perfil');
    const nomePerfilSelecionado = selectPerfilElement.value;
    apagarPerfil(nomePerfilSelecionado);
});

// Inicialização da aplicação
function inicializar() {
    // Aqui pode ser adicionada lógica de inicialização, se necessário
    atualizarPerfisSalvos();
}

// Chamada da função de inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', inicializar);
