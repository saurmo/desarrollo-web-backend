import { Router, Request, Response } from "express"
import { createUserHandler, getAllUsersHandler, getOneUserHandler, removeUserHandler, updateUserHandler } from "../controllers/users.controller"


const router = Router()
// /usuarios?page=1
router.get('/users', getAllUsersHandler)
router.post('/users', createUserHandler)
router.get('/users/:id', getOneUserHandler)
router.put('/users/:id', updateUserHandler)
router.delete('/users/:id', removeUserHandler)

export default router