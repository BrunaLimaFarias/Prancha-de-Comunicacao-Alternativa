//SQLDatabaseConfig.js

// Classe responsável por configurar a conexão com o banco de dados SQL
class SQLDatabaseConfig {
    // Propriedades estáticas para armazenar a instância e a plataforma do banco de dados
    static instance = null;
    static platform = null;

    // Construtor da classe
    constructor() {
        // Verifica se já existe uma instância e, caso contrário, define esta instância como a instância única
        if (!SQLDatabaseConfig.instance) {
            SQLDatabaseConfig.instance = this;
        }
        // Retorna a instância
        return SQLDatabaseConfig.instance;
    }

    // Método para obter a conexão com o banco de dados
    getConnection() {
        // Chama o método para criar a conexão
        return this.createConnection();
    }

    // Método para criar a conexão com o banco de dados
    createConnection() {

        // Verifica se a plataforma do banco de dados já foi definida
        if (!SQLDatabaseConfig.platform) {
            // Obtém a plataforma do banco de dados usando o serviço de dependência
            SQLDatabaseConfig.platform = DependencyService.get('IDatabasePlatform');
        }

        // Importa os módulos necessários
        const path = require('path');
        const sqlite3 = require('sqlite3').verbose();
        // Define o caminho do arquivo do banco de dados
        const dbPath = path.join(SQLDatabaseConfig.platform.directoryDB, 'db_imagens.db3');
        // Retorna uma nova instância do banco de dados SQLite com o caminho especificado
        return new sqlite3.Database(dbPath);
    }

    // Método estático para obter a instância única da classe
    static getInstance() {
        // Verifica se já existe uma instância e, caso contrário, cria uma nova instância
        if (!SQLDatabaseConfig.instance) {
            SQLDatabaseConfig.instance = new SQLDatabaseConfig();
        }
        // Retorna a instância
        return SQLDatabaseConfig.instance;
    }
}