import { Request, Response } from "express";
import { AdarterData } from "../business/adapter/AdapterData";

const service = AdarterData.getDataAccess("pg")
const TABLE = "users"

export const getUsers = (req: Request, res: Response) => {
    return res.send("getUsers")
}

export const getOneUser = (req: Request, res: Response) => {
    const { id } = req.params
    service.getOneItem(TABLE, id).then(user => {
        res.send(user)
    }).catch(error => {
        res.status(500).send(error)

    })
}

export const createUser = (req: Request, res: Response) => {
    return res.send("createUser - es este")
}

export const updateUser = (req: Request, res: Response) => {
    return res.send("updateUser")
}

export const deleteUser = (req: Request, res: Response) => {
    return res.send("deleteUser")
}