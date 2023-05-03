import { Request, Response } from "express";
import myDataSource from "../app-data-source";
import { Subject } from "../entities/subject.entity";
import { ResponseModel } from "../business/models/response.model";


export const getSubjects = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Get exitoso", []);
    try {
        const subjects = await myDataSource.getRepository(Subject).find()
        responseModel.info = subjects
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al obtener TODAS LAS materia."
        return res.status(500).send(responseModel)
    }
}

export const getOneSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "GetOne exitoso", []);
    try {
        const results = await myDataSource.getRepository(Subject).findOneBy({
            id: parseInt(req.params.id),
        })
        responseModel.info = results
        if (results) {
            return res.send(responseModel)
        }
        responseModel.ok=false
        return res.status(404).send(responseModel)
     
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al obtener una materia."
        return res.status(500).send(responseModel)
    }

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

export const updateSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Update exitoso", []);
    try {
        const { id } = req.params
        const subject = await myDataSource.getRepository(Subject).findOneBy({
            id: parseInt(id),
        })
        if (subject) {
            myDataSource.getRepository(Subject).merge(subject, req.body)
            const results = await myDataSource.getRepository(Subject).save(subject)
            responseModel.info = results
            return res.send(responseModel)
        }
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al modificar una materia"
        return res.status(500).send(responseModel)
    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Delete exitoso", []);
    try {
        const results = await myDataSource.getRepository(Subject).delete(req.params.id)
        responseModel.info = results
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al eliminar una materia"
        return res.status(500).send(responseModel)
    }
}