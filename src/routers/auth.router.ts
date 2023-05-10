
import { Router } from "express";
import { login, verifyToken } from "../controllers/auth.controller";


const authRouter: Router = Router();

authRouter
    .post("/login", login)
    .get("/verify", verifyToken)


export default authRouter;