
import { MongoClient, ObjectId } from 'mongodb'
import { IDataAccess } from './IDataAccess';

export class MongoService implements IDataAccess {

    private conectionString: string;
    private database: string;

    constructor() {
        // this.conectionString="mongodb+srv://USER:PASSWORD@HOST/DATABASE"
        this.conectionString = "mongodb+srv://saurmo-udem:5ECcNsgpXOYOlKG6@clusterudem.3l9e6.mongodb.net/api_tasks"
        this.database = "api_tasks";
    }
    
   async getUserByCredentiales(email: string): Promise<any> {
    const client = this.connectionDb()
    try {
        const db = client.db(this.database)
        const collection = db.collection('users')
        const item = await collection.findOne({ email })
        return item
    } finally {
        await client.close()
    }
    }

    async getOneItem(collectionName: string, id: string): Promise<any> {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const objectId = new ObjectId(id)
            const items = await collection.findOne({ _id: objectId })
            return items
        } finally {
            await client.close()
        }
    }
    async deleteItem(collectionName: string, id: string): Promise<any> {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const objectId = new ObjectId(id)
            const item = await collection.deleteOne({ _id: objectId })
            return item
        } finally {
            await client.close()
        }
    }
    async createItem(collectionName: string, payload: Object): Promise<any> {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const item = await collection.insertOne(payload)
            return item
        } finally {
            await client.close()
        }
    }
    async updateItem(collectionName: string, id: string, payload: any): Promise<any> {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const objectId = new ObjectId(id)
            payload._id = objectId;
            const item = await collection.replaceOne({ _id: objectId }, payload)
            return item
        } finally {
            await client.close()
        }
    }

    async getItems(collectionName: string, filter?:any) {
        const client = this.connectionDb()
        try {
            const db = client.db(this.database)
            const collection = db.collection(collectionName)
            const items = await collection.find(filter).toArray()
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