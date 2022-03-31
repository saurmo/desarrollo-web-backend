
const { MongoClient } = require("mongodb");

// Connection URI
const uri = process.env.URI_MONGODB;

// Create a new MongoClient
const client = new MongoClient(uri);

const conectarDB = async () => {
  // Connect the client to the server
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}

const leerDocumentos = async (nombreColeccion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return  coleccion.find().toArray()
}

const agregarDocumento = async (nombreColeccion, informacion) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return await coleccion.insertOne(informacion)
}

const eliminarDocumento =async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return await coleccion.deleteOne(filtro)
}

const modificarDocumento =async (nombreColeccion, filtro, nuevoDocumento) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  return await coleccion.replaceOne(filtro, nuevoDocumento)
}

module.exports = { agregarDocumento, modificarDocumento, eliminarDocumento, leerDocumentos}