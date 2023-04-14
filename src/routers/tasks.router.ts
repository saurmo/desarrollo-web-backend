
import { Router } from "express";
import {
    createUser, deleteUser,
    getUsers, updateUser
} from "../controllers/users.controller";

const userRouter: Router = Router().get("/users", getUsers)
    .post("/users", createUser)
    .put("/users", updateUser)
    .delete("/users", deleteUser)

export default userRouter;