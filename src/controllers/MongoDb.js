
const { MongoClient, ObjectId } = require('mongodb')

// const URI = "mongodb+srv://USER:PASSWORD@HOST"
const uri = "mongodb+srv://saurmo-udem:9nVhp5fsbdKQRBLf@clusterudem.3l9e6.mongodb.net/?retryWrites=true&w=majority";
// HOST: clusterudem.3l9e6.mongodb.net
// USER: saurmo-udem
// PASSWORD: 9nVhp5fsbdKQRBLf
// DATABASE: tienda


const getDocuments = async (dbName, collectionName) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getDocumentsWithFilter = async (dbName, collectionName, filter) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find(filter).toArray();
    return result
}


const getDocumentById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.findOne({ _id: idMongo });
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

const updateDocumentById = async (dbName, collectionName, { id, data }) => {
    const mongoClient = new MongoClient(uri)
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteDocumentById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}


module.exports = { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }