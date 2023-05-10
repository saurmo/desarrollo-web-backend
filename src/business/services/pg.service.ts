
import sqlAdapter from '../adapter/SqlAdapter';
import { IDataAccess } from './IDataAccess';
import { Pool } from 'pg';
export class PostgressService implements IDataAccess {

    constructor() {
    }

    async getOneItem(tableName: string, id: string): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "getOne")
            if (!query) return null
            const result = await client.query(query, [id])
            return result.rowCount > 0 ? result.rows : [];
        } catch (error) {
            return null;
        }
    }

    async getUserByCredentiales(id: string, pass:string): Promise<object> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter("users", "login")
            if (!query) return {}
            const result = await client.query(query, [id, pass])
            return result.rowCount > 0 ? result.rows[0] : {};
        } catch (error) {
            return {};
        }
    }

    async deleteItem(tableName: string, id: string): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "delete")
            if (!query) return null
            const result = await client.query(query, [id])
            return result;
        } catch (error) {
            return null;
        }
    }
    async createItem(tableName: string, payload: Array<any>): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "post")
            if (!query) return null
            const result = await client.query(query, payload)
            return result.rowCount == 1;
        } catch (error: any) {
            console.log(error);
            if (error.code === "23505") {
                throw new Error("El item ya existe")
            }
            throw new Error("Error al crear un item")
        }
    }
    async updateItem(tableName: string, id: string, payload: Array<any>): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "put")
            if (!query) return null
            const result = await client.query(query, payload)
            return result;
        } catch (error) {
            return null;
        }
    }

    async getItems(tableName: string): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "get")
            if (!query) return null
            const result = await client.query(query)
            return result.rowCount > 0 ? result.rows : [];
        } catch (error) {
            return null;
        }
    }

    async getClient() {
        const pool = new Pool()
        const client = await pool.connect()
        return client
    }



}