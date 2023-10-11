const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { IDatabase } = require("./AdapterDatabase");
const ConfigService = require("./ConfigService");

const config = new ConfigService();

const getClient = () => {
  const user = config.get("database.user");
  const password = config.get("database.password");
  const host = config.get("database.host");
  const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client;
};

class MongoService extends IDatabase {
  constructor() {
    super();
    console.log("Mongo Service");
  }
  async executeQuery(collectionName) {
    const client = getClient();
    try {
      await client.connect();
      const dbName = config.get("database.name");
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      /// Ejecutar comandos
      const rows = await collection.find().toArray();
      return rows;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async findOne(collectionName, id) {
    const _id = new ObjectId(id);
  }
}

module.exports = { MongoService };
