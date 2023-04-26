import { Request, Response } from "express";
import { AdarterData } from "../business/adapter/AdapterData";

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

export const createSubject = (req: Request, res: Response) => {
    return res.send("createSubject - es este")
}

export const updateSubject = (req: Request, res: Response) => {
    return res.send("updateSubject")
}

export const deleteSubject = (req: Request, res: Response) => {
    return res.send("deleteUser")
}