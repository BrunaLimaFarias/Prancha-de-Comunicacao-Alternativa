const apiKey = 'afaaa54c319a4dba81f57014b11ffb57';
const cityToStateMap = {
    "Curitiba": "Paraná",
    "São Paulo": "São Paulo",
    "Rio de Janeiro": "Rio de Janeiro",
    // Adicionar mais mapeamentos de cidade para estado conforme necessário
};

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

// Função para obter a localização do usuário com base no endereço IP usando a API do Geoapify
async function getLocalizacaoUsuario() {
    try {
        const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`);
        const data = await response.json();

        if (data && data.city && data.city.name && data.country && data.country.name_native) {
            const cidade = traduzirTermo(data.city.name);
            let estado = traduzirTermo(data.state.name);
            const pais = traduzirTermo(data.country.name_native);
            const latitude = data.location.latitude;
            const longitude = data.location.longitude;

            // Correção do estado com base no mapeamento de cidades
            if (cityToStateMap[cidade]) {
                estado = cityToStateMap[cidade];
            }

            const localData = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const localJson = await localData.json();

            const type = traduzirTermo(localJson.type);
            const endereco = localJson.address.road || 'Desconhecido';
            const bairro = localJson.address.suburb || 'Desconhecido';

            return { cidade, estado, pais, type, endereco, bairro };
        } else {
            throw new Error('Dados de localização incompletos ou inválidos.');
        }
    } catch (error) {
        console.error('Erro ao obter localização:', error);
        throw error;
    }
}

// Função para fazer a predição com base no contexto de tempo e geolocalização
function fazerPredicao() {
  const periodoDia = getPeriodoDia();

  getLocalizacaoUsuario()
  .then((localizacao) => {
    // Saída da predição com base no contexto
    const predicao = `Usuário está numa ${localizacao.type} na cidade de ${localizacao.cidade}, ${localizacao.estado}, ${localizacao.pais}, no bairro ${localizacao.bairro}, endereço ${localizacao.endereco}, durante a ${periodoDia}.`;

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
  });
}

// Função para atualizar o texto da predição no HTML
function atualizarPredicaoTexto(texto) {
  document.getElementById('predicao-texto').value = texto;
}

// Adicionar evento de clique ao botão para fazer a predição manualmente
document
  .getElementById('btn-fazer-predicao')
  .addEventListener('click', function () {
    fazerPredicao();
  });
