const { Pool } = require('pg')

const config = require('../config/index.config');

class PostgresService {

    constructor() {
        this.pool = this.iniciarPool()
    }

    iniciarPool() {
        return new Pool({
            user: config.PGUSER,
            host: config.PGHOST,
            database: config.PGDATABASE,
            password: config.PGPASSWORD,
            port: config.PGPORT,
            // ssl: true
        })
    }

    async ejecutarQuery(sql, datos) {
        if (datos) {
            return await this.pool.query(sql, datos)
        } else {
            return await this.pool.query(sql)
        }
    }

    async estaConectado() {
        return await this.pool.connect()
    }

}


module.exports = PostgresService