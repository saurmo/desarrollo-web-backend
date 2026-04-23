import { Request, Response } from "express"
import { users } from "../data/users.data"


const createUserHandler = (req: Request, res: Response) => {
    const payload = req.body
    res.status(201).json({
        message: 'usuario creado',
        usuario: payload
    })
}

const getAllUsersHandler = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string)
    if (Number.isNaN(page) || page < 0) {
        return res.status(400).send({
            message: 'Page not valid'
        })
    }
    res.status(200).json({
        pagination: {
            page
        },
        users
    })
}

const getOneUserHandler =  (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({
        usuarios: {
            id
        }
    })
}

const updateUserHandler =  (req: Request, res: Response) => {
    // capturar el id
    // capturar el json
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
}


const removerUserHandler =  (req: Request, res: Response) => {
    // capturar el id
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
}

export { createUserHandler, getAllUsersHandler, getOneUserHandler, updateUserHandler, removerUserHandler }
