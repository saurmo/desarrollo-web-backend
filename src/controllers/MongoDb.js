
const { MongoClient, ObjectId } = require('mongodb')

// const URI = "mongodb+srv://USER:PASSWORD@HOST"
const uri = "mongodb+srv://saurmo-udem:9nVhp5fsbdKQRBLf@clusterudem.3l9e6.mongodb.net/?retryWrites=true&w=majority";

const getDocuments = async (dbName, collectionName) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}
const getDocumentById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({ _id: idMongo }).toArray();
    return result
}

/**
 * Insert document with mongoDB
 * @param {*} dbName Database Name
 * @param {*} collectionName Collection Name
 * @param {*} data Data to insert
 * @returns Promise 
 */
const insertDocument = async (dbName, collectionName, data) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    return result
}


module.exports = { getDocuments, insertDocument, getDocumentById }