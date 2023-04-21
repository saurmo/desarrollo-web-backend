import { IDataAccess } from "../services/IDataAccess";
import { MongoService } from "../services/mongo.service";
import { PostgressService } from "../services/pg.service";

export class AdarterData {
    constructor() {

    }

    static getDataAccess(): IDataAccess  {
        let database = "mongo"
        switch (database) {
            case "mongo":
                return new MongoService();
            case "pg":
                return new PostgressService();
            default:
                return new MongoService();
        }
    }
}