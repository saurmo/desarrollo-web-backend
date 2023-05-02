import { Request, Response } from "express";
import { AdarterData } from "../business/adapter/AdapterData";
import myDataSource from "../app-data-source";
import { Subject } from "../entities/subject.entity";
import { ResponseModel } from "../business/models/response.model";

const service = AdarterData.getDataAccess()
const COLLECTION = "subjects"

export const getSubjects = (req: Request, res: Response) => {
    return res.send("getSubjects")
}

export const getOneSubject = (req: Request, res: Response) => {
    const { id } = req.params
    service.getOneItem(COLLECTION, id).then(Subject => {
        res.send(Subject)
    }).catch(error => {
        res.status(500).send(error)
    })
}

export const createSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Creación exitosa", []);
    try {
        const subject = req.body
        const subjectEntity = await myDataSource.getRepository(Subject).create(subject)
        const results = await myDataSource.getRepository(Subject).save(subjectEntity)
        responseModel.info = results
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al crear una materia."
        return res.status(500).send(responseModel)
    }

}

export const updateSubject = (req: Request, res: Response) => {
    return res.send("updateSubject")
}

export const deleteSubject = (req: Request, res: Response) => {
    return res.send("deleteUser")
}