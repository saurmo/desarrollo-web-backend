
import { IDataAccess } from './IDataAccess';

export class PostgressService implements IDataAccess {

    private conectionString: string;
    private database: string;

    constructor() {
        // this.conectionString="mongodb+srv://USER:PASSWORD@HOST/DATABASE"
        this.conectionString = ""
        this.database = "";
    }
    getOneItem(collectionName: string, id: string): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    deleteItem(collectionName: string, id: string): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    createItem(collectionName: string, payload: Object): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    updateItem(collectionName: string, id: string, payload: Object): Promise<any[]> {
        throw new Error('Method not implemented.');
    }

    async getItems(collectionName: string) {
        const client = this.connectionDb()
        try {

            return [{ name: "Hola desde pg" }]
        } finally {
        }
    }

    connectionDb() {
        return null
    }



}