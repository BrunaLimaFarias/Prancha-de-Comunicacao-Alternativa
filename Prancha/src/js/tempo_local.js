const googleApiKey = 'AIzaSyA25TyRbuYauUv9XylAv-e_yUzbSedJ0Tg';

const cityToStateMap = {
    "Curitiba": "Paraná",
    "São Paulo": "São Paulo",
    "Rio de Janeiro": "Rio de Janeiro",
    // Adicionar mais mapeamentos de cidade para estado conforme necessário
};

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

        // Saída da predição com base no contexto
        const predicao = `Usuário está num(a) ${enderecoDetalhado.type} na cidade de ${enderecoDetalhado.cidade}, ${enderecoDetalhado.estado}, ${enderecoDetalhado.pais}, no bairro ${enderecoDetalhado.bairro}, endereço ${enderecoDetalhado.endereco}, durante a ${periodoDia}.`;

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

// Adicionar evento de clique ao botão para fazer a predição manualmente
document
    .getElementById('btn-fazer-predicao')
    .addEventListener('click', function () {
        fazerPredicao();
    });
