class PredictionManager {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.cityToStateMap = {
            "Curitiba": "Paraná",
            // Adicionar mais mapeamentos de cidade para estado conforme necessário
        };
    }

    // Método para obter o período do dia com base no horário atual
    getPeriodoDia() {
        const horaAtual = new Date().getHours();
        if (horaAtual >= 5 && horaAtual < 12) {
            return 'manhã';
        } else if (horaAtual >= 12 && horaAtual < 18) {
            return 'tarde';
        } else {
            return 'noite';
        }
    }

    // Método provisório para traduzir termos para português
    traduzirTermo(termo) {
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

    // Método para obter a localização do usuário com base no endereço IP usando a API do Geoapify
    async getLocalizacaoUsuario() {
        try {
            const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${this.apiKey}`);
            const data = await response.json();

            if (data && data.city && data.city.name && data.country && data.country.name_native) {
                const cidade = this.traduzirTermo(data.city.name);
                let estado = this.traduzirTermo(data.state.name);
                const pais = this.traduzirTermo(data.country.name_native);
                const latitude = data.location.latitude;
                const longitude = data.location.longitude;

                // Correção do estado com base no mapeamento de cidades
                if (this.cityToStateMap[cidade]) {
                    estado = this.cityToStateMap[cidade];
                }

                const localData = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                const localJson = await localData.json();

                const type = this.traduzirTermo(localJson.type);

                return { cidade, estado, pais, type };
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
            const periodoDia = this.getPeriodoDia();
            const localizacao = await this.getLocalizacaoUsuario();

            // Saída da predição com base no contexto
            console.log(`Usuário está numa ${localizacao.type} na cidade de ${localizacao.cidade}, ${localizacao.estado}, ${localizacao.pais} durante a ${periodoDia}.`);

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
