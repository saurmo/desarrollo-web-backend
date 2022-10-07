
const { MongoC
    lient } = require('mongodb')

// const URI = "mongodb+srv://USER:PASSWORD@HOST"
const uri = "mongodb+srv://saurmo-udem:9nVhp5fsbdKQRBLf@clusterudem.3l9e6.mongodb.net/?retryWrites=true&w=majority";

const getDocuments = async (dbName, collection) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const products = db.collection(collection)
    const result = await products.find({}).toArray();
    return result
}

module.exports = { getDocuments }