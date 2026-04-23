import { Router, Request, Response } from "express"
import { createUserHandler, getAllUsersHandler,  getOneUserHandler, removerUserHandler, updateUserHandler } from "../controllers/users.controller"
import { authMiddleware } from "../middlewares/auth.middleware"


const router = Router()
// /usuarios?page=1

router.get('/users',  getAllUsersHandler)
router.post('/users', createUserHandler)
router.get('/users/:id', getOneUserHandler)
router.put('/users/:id', updateUserHandler)
router.delete('/users/:id', removerUserHandler )

export default router