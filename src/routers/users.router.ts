
import { Router } from "express";
import {
    createUser, deleteUser,
    getOneUser,
    getUsers, updateUser
} from "../controllers/users.controller";

const userRouter: Router = Router()

userRouter.get("/users", getUsers)
    .get("/users/:id", getOneUser)
    .post("/users", createUser)
    .put("/users/:id", updateUser)
    .delete("/users/:id", deleteUser)

export default userRouter;