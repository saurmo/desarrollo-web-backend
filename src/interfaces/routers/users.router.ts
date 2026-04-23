import { Router } from "express"
import { createUserHandler, getAllUsersHandler, getOneUserHandler, removeUserHandler, updateUserHandler } from "../controllers/users.old.controller"
import { authMiddleware } from "../middlewares/auth.middleware"


const router = Router()
// /usuarios?page=1
router.get('/users', getAllUsersHandler)
router.post('/users', createUserHandler)
router.get('/users/:id', getOneUserHandler)
router.put('/users/:id', updateUserHandler)
router.delete('/users/:id', removeUserHandler)

export default router