import { Request, Response } from "express"

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
        usuarios: []
    })
}

export { createUserHandler, getAllUsersHandler }
