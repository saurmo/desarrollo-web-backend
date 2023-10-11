
class IDatabase {
  executeQuery(collectionName) {
    throw "Implementar método";
  }
  findOne(collectionName, id) {
    throw "Implementar método";
  }
}

module.exports = { IDatabase };
