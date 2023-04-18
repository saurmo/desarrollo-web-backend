
import { Router } from "express";
import {
    createTask, deleteTask,
    getOneTasks,
    getTasks, updateTask
} from "../controllers/tasks.controller";

const taskRouter: Router = Router();

taskRouter.get("/tasks", getTasks)
    .get("/tasks/:id", getOneTasks)
    .post("/tasks", createTask)
    .put("/tasks/:id", updateTask)
    .delete("/tasks/:id", deleteTask)

export default taskRouter;