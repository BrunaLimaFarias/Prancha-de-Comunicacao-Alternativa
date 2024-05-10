const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class SQLDatabaseConfig {
    static instance = null;
    static _platform = null;

    static getInstance() {
        if (!SQLDatabaseConfig.instance) {
            SQLDatabaseConfig.instance = new SQLDatabaseConfig();
        }
        return SQLDatabaseConfig.instance;
    }

    getConnection() {
        return this.createConnection();
    }

    createConnection() {
        if (!SQLDatabaseConfig._platform) {
            // Assuming DependencyService is a custom service that needs to be implemented in JS
            SQLDatabaseConfig._platform = DependencyService.get('IDatabasePlatform');
        }

        const dbPath = path.join(SQLDatabaseConfig._platform.directoryDB, 'db_imagens.db3');
        return new sqlite3.Database(dbPath);
    }
}