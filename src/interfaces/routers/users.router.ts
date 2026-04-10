import { Router, Request, Response } from "express"
import { createUserHandler, getAllUsersHandler } from "../controllers/users.controller"


const router = Router()
// /usuarios?page=1

router.get('/usuarios', getAllUsersHandler)
router.post('/usuarios', createUserHandler)

router.get('/usuarios/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({
        usuarios: {
            id
        }
    })
})

router.put('/usuarios/:id', (req: Request, res: Response) => {
    // capturar el id
    // capturar el json
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
})

router.delete('/usuarios/:id', (req: Request, res: Response) => {
    // capturar el id
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
})

export default router