import { Request, Response } from "express";
import { ResponseModel } from "../business/models/response.model";
import { MongoService } from "../business/services/mongo.service";
import { IDataAccess } from "../business/services/IDataAccess";
import { PostgressService } from "../business/services/pg.service";
import { AdarterData } from "../business/adapter/AdapterData";

const service = AdarterData.getDataAccess()
const COLLECTION = "tasks"
export const getTasks = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const tasks: any[] = await service.getItems(COLLECTION);
        responseModel.info = tasks
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar las tareas"
        return res.status(500).send(responseModel)
    }
}

export const getOneTasks = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const { id } = req.params
        const task = await service.getOneItem(COLLECTION, id);
        responseModel.info = task
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar la tarea"
        return res.status(500).send(responseModel)
    }
}

export const createTask = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", []);
    try {
        const payload = req.body
        const task = await service.createItem(COLLECTION, payload);
        responseModel.info = { ...payload, _id: task.insertedId }
        return res.status(201).send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al crear la tarea"
        return res.status(500).send(responseModel)
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Actualización exitosa", []);
    try {
        const { id } = req.params
        const payload = req.body
        await service.updateItem(COLLECTION, id, payload);
        responseModel.info = payload
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al actualizar la tarea"
        return res.status(500).send(responseModel)
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Eliminación exitosa", []);
    try {
        const { id } = req.params
        const payload = req.body
        await service.updateItem(COLLECTION, id, payload,);
        responseModel.info = id
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al eliminar la tarea"
        return res.status(500).send(responseModel)
    }
}