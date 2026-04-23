import { Request, Response } from "express"
import { users } from "../data/users.data"


const users = [
    {id:"1", name:"juan"},
    {id:"2", name:"maria"}
]

const createUserHandler = (req: Request, res: Response) => {
    const payload = req.body // capturar el body
    res.status(201).json({
        message: 'usuario creado',
        user: payload
    })
}

const getAllUsersHandler = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) // capturando un query.page
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

const getOneUserHandler = (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({
        usuarios: {
            id
        }
    })
}

const updateUserHandler = (req: Request, res: Response) => {
    // capturar el id
    // capturar el json
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })


}


const removeUserHandler = (req: Request, res: Response) => {
    // capturar el id
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
}
export {
    createUserHandler, getAllUsersHandler, getOneUserHandler,
    updateUserHandler, removeUserHandler
}
