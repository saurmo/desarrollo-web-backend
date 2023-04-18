import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
    return res.send("getUsers")
}

export const getOneUser = (req: Request, res: Response) => {
    return res.send("getOneUser")
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