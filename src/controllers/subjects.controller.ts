
import { Request, Response } from "express";
import { ResponseModel } from "../business/models/response.model";
import { AdarterData } from "../business/adapter/AdapterData";
import { SubjectDto } from "../business/models/Subject.dto";

const service = AdarterData.getDataAccess()
const COLLECTION = "subjects"
export const getSubjects = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const subjects: any[] = await service.getItems(COLLECTION);
        responseModel.info = subjects
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar las materias"
        return res.status(500).send(responseModel)
    }
}

export const getOneSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const { id } = req.params
        const subject = await service.getOneItem(COLLECTION, id);
        responseModel.info = subject
        if (subject) {

            return res.send(responseModel)
        }
        return res.status(404).send(responseModel)

    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar la materia"
        return res.status(500).send(responseModel)
    }
}

export const createSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", []);
    try {
        const payload = req.body
        const subjectDto = SubjectDto.createInstace(payload)
        const hasErrors = await subjectDto.isValid()
        if (hasErrors?.errors) {
            responseModel.ok = false
            responseModel.message = "Error en los datos"
            responseModel.info = hasErrors.errors
            return res.status(400).send(responseModel)
        }
        const subject = await service.createItem(COLLECTION, payload);
        responseModel.info = { ...payload, _id: subject.insertedId }
        return res.status(201).send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al crear la materia"
        return res.status(500).send(responseModel)
    }
}

export const updateSubject = async (req: Request, res: Response) => {
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
        responseModel.message = "Error al actualizar la materia"
        return res.status(500).send(responseModel)
    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Eliminación exitosa", []);
    try {
        const { id } = req.params
        await service.deleteItem(COLLECTION, id);
        responseModel.info = id
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al eliminar la materia"
        return res.status(500).send(responseModel)
    }
}