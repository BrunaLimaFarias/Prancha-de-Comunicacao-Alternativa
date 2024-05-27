class PredictionManager {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    // Método para obter o período do dia com base no horário atual
    async getPeriodoDia() {
        const horaAtual = new Date().getHours();
        // Verifica o período do dia com base na hora atual
        if (horaAtual >= 5 && horaAtual < 12) {
            return 'manhã'; // Retorna 'manhã' se estiver entre 5h e 12h
        } else if (horaAtual >= 12 && horaAtual < 18) {
            return 'tarde'; // Retorna 'tarde' se estiver entre 12h e 18h
        } else {
            return 'noite'; // Retorna 'noite' caso contrário
        }
    }

    // Método para obter a localização do usuário com base no endereço IP usando a API do Geoapify
    async getLocalizacaoUsuario() {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${this.apiKey}`);
            const data = await response.json();

            // Verifica se os dados de localização foram retornados corretamente
            if (data && data.city && data.city.name && data.country && data.country.name_native) {
                const cidade = data.city.name;
                const estado = data.state.name;
                const pais = data.country.name_native;
                const latitude = data.location.latitude;
                const longitude = data.location.longitude;

                // Obter detalhes do local do usuário
                const localData = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const localJson = await localData.json();

                // Extrair informações relevantes do endereço detalhado
                const numeroRua = localJson.address.house_number;
                const rua = localJson.address.road;
                const bairro = localJson.address.suburb;
                const type = localJson.type;

                const detalhes = `${numeroRua}, ${rua}, ${bairro}`;
                return { cidade, estado, pais, detalhes, type };
            } else {
                throw new Error('Dados de localização incompletos ou inválidos.');
            }
        } catch (error) {
            console.error('Erro ao obter localização:', error);
            throw error;
        }
    }

    // Método para fazer a predição com base no contexto de tempo e geolocalização
    async fazerPredicao() {
        try {
            const periodoDia = await this.getPeriodoDia();
            const localizacao = await this.getLocalizacaoUsuario();

            // Saída da predição com base no contexto
            console.log(`Usuário está numa ${localizacao.type} na cidade de ${localizacao.cidade}, ${localizacao.estado}, ${localizacao.pais}; e no local ${localizacao.detalhes} durante a ${periodoDia}.`);

            // Implementação da lógica para a predição com base em contexto
            if (periodoDia === 'manhã') {
                console.log('Ações comuns durante a manhã: Café da manhã, preparativos para o dia.');
            } else if (periodoDia === 'tarde') {
                console.log('Ações comuns durante a tarde: Almoço, trabalho ou estudos.');
            } else {
                console.log('Ações comuns durante a noite: Jantar, relaxamento, sono.');
            }
        } catch (error) {
            console.error('Erro ao fazer predição:', error);
            throw error;
        }
    }
}

// Crie uma instância de PredictionManager com a chave da API Geoapify
const predictionManager = new PredictionManager('afaaa54c319a4dba81f57014b11ffb57');

// Chamada do método para fazer a predição
predictionManager.fazerPredicao();
