
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
            const result = await client.query(query, [id])
            return result;
        } catch (error) {
            return null;
        }
    }

    async deleteItem(tableName: string, id: string): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "delete")
            const result = await client.query(query, [id])
            return result;
        } catch (error) {
            return null;
        }
    }
    async createItem(tableName: string, payload: Object): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "post")
            const result = await client.query(query, [payload])
            return result;
        } catch (error) {
            return null;
        }
    }
    async updateItem(tableName: string, id: string, payload: Object): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "put")
            const result = await client.query(query, [payload])
            return result;
        } catch (error) {
            return null;
        }
    }

    async getItems(tableName: string): Promise<any> {
        try {
            const client = await this.getClient();
            const query = sqlAdapter(tableName, "get")
            console.log(query);
            
            const result = await client.query(query)
            return result;
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