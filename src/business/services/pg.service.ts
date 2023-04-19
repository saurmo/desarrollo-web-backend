
import { IDataAccess } from './IDataAccess';

export class PostgressService implements IDataAccess {

    private conectionString: string;
    private database: string;

    constructor() {
        // this.conectionString="mongodb+srv://USER:PASSWORD@HOST/DATABASE"
        this.conectionString = ""
        this.database = "";
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