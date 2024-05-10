// Classe responsável por criar um temporizador de prancha
class PranchaTimer {
    // Construtor da classe
    constructor(timespan, callback) {
        // Define o intervalo de tempo e a função de retorno de chamada
        this.timespan = timespan;
        this.callback = callback;
        // Define a flag de cancelamento como falsa por padrão
        this.cancellation = false;
    }

    // Método para iniciar o temporizador
    start() {
        // Define a flag de cancelamento como falsa
        this.cancellation = false;
        // Cria um intervalo que executa a função de retorno de chamada a cada intervalo de tempo definido
        this.timer = setInterval(() => {
            // Verifica se o temporizador foi cancelado
            if (this.cancellation) {
                // Se foi cancelado, limpa o intervalo e retorna
                clearInterval(this.timer);
                return;
            }
            // Se não foi cancelado, chama a função de retorno de chamada
            this.callback();
        }, this.timespan);
    }

    // Método para parar o temporizador
    stop() {
        // Define a flag de cancelamento como verdadeira
        this.cancellation = true;
    }
}