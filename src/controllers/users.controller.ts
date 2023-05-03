import { Request, Response } from "express";
import { AdarterData } from "../business/adapter/AdapterData";
import { ResponseModel } from "../business/models/response.model";

const service = AdarterData.getDataAccess("pg")
const TABLE = "users"

export const getUsers = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const users = await service.getItems(TABLE);
        responseModel.info = users
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar los usuarioss"
        return res.status(500).send(responseModel)
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const { id } = req.params
        const user = await service.getOneItem(TABLE, id);
        responseModel.info = user
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar el usuario"
        return res.status(500).send(responseModel)
    }
}

export const createUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", []);
    try {
        const payload = req.body
        const user = await service.createItem(TABLE, payload);
        responseModel.info = user
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar el usuario"
        return res.status(500).send(responseModel)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Actualización exitosa", []);
    try {
        const { id } = req.params
        const payload = req.body
        await service.updateItem(TABLE, id, payload);
        responseModel.info = payload
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al actualizar el usuario"
        return res.status(500).send(responseModel)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Eliminación exitosa", []);
    try {
        const { id } = req.params
        const payload = req.body
        await service.updateItem(TABLE, id, payload,);
        responseModel.info = id
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al eliminar el usuario"
        return res.status(500).send(responseModel)
    }
}