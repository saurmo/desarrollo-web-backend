import { Request, Response } from "express";

export const getTasks = (req: Request, res: Response) => {
    return res.send("getTasks")
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