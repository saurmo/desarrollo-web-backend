
import { MongoClient } from 'mongodb'
import { IDataAccess } from './IDataAccess';

export class MongoService extends IDataAccess {

    private conectionString: string;
    private database: string;

    constructor() {
        super()
        // this.conectionString="mongodb+srv://USER:PASSWORD@HOST/DATABASE"
        this.conectionString = "mongodb+srv://saurmo-udem:5ECcNsgpXOYOlKG6@clusterudem.3l9e6.mongodb.net/api_tasks"
        this.database = "api_tasks";
    }
    
    async getItems(collectionName: string) {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const items = await collection.find().toArray()
            return items
        } finally {
            await client.close()
        }
    }

    connectionDb() {
        const client = new MongoClient(this.conectionString);
        return client
    }

   

}