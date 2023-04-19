export abstract class IDataAccess {
   abstract getItems(collectionName:string):Promise<any[]>;
}