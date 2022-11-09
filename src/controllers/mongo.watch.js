const { MongoClient } = require('mongodb')

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://saurmo-udem:9nVhp5fsbdKQRBLf@clusterudem.3l9e6.mongodb.net/?retryWrites=true&w=majority";



let changeStream;

async function run() {
    const client = new MongoClient(uri);
  try {


    const database = client.db("tienda");
    const collection = database.collection("productos");

    // open a Change Stream on the "haikus" collection
    changeStream = collection.watch();

    // set up a listener when change events are emitted
    changeStream.on("change", next => {
      // process any change event
      console.log("received a change to the collection: \t", next);
    });

    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
