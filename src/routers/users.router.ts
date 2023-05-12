
import { Router } from "express";
import {
    createUser, deleteUser,
    getOneUser,
    getUsers, updateUser
} from "../controllers/users.controller";
import { isValidToken } from "../controllers/auth.controller";

const userRouter: Router = Router()

userRouter
    .post("/users", createUser)
    .get("/users", isValidToken, getUsers)
    .get("/users/:id", isValidToken, getOneUser)
    .put("/users/:id", isValidToken, updateUser)
    .delete("/users/:id", isValidToken, deleteUser)

export default userRouter;