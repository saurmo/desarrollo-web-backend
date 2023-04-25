
import { IDataAccess } from './IDataAccess';
import { Pool } from 'pg';
export class PostgressService implements IDataAccess {



    constructor() {
        // this.conectionString="mongodb+srv://USER:PASSWORD@HOST/DATABASE"

    }
    async getOneItem(tableName: string, id: string): Promise<any> {
        try {
            const client = await this.getClient();
          const result=  await client.query('SELECT NOW()')
            return result;
        } catch (error) {
            return null;
        }

    }
    deleteItem(tableName: string, id: string): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    createItem(tableName: string, payload: Object): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    updateItem(tableName: string, id: string, payload: Object): Promise<any[]> {
        throw new Error('Method not implemented.');
    }

    async getItems(tableName: string) {
        return []
    }

    async getClient() {
        const pool = new Pool()
        const client = await pool.connect()
        return client
    }



}