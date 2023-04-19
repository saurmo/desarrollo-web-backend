import { Request, Response } from "express";
import { ResponseModel } from "../business/models/response.model";
import { MongoService } from "../business/services/mongo.service";
import { IDataAccess } from "../business/services/IDataAccess";
import { PostgressService } from "../business/services/pg.service";

class Adapter {
    constructor() {

    }
    static getDataAccess(): IDataAccess {
        return new PostgressService()
    }
}

export const getTasks = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);

    try {

        const service = Adapter.getDataAccess()
        const tasks: any[] = await service.getItems("tasks");
        responseModel.info = tasks
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar las tareas"
        return res.send(responseModel)
    }
}

export const getOneTasks = (req: Request, res: Response) => {
    return res.send("getOneTasks")
}

export const createTask = (req: Request, res: Response) => {
    return res.send("createTask - es este")
}

export const updateTask = (req: Request, res: Response) => {
    return res.send("updateTask")
}

export const deleteTask = (req: Request, res: Response) => {
    return res.send("deleteTask")
}