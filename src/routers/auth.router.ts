
import { Router } from "express";
import { isValidToken, login, verifyToken } from "../controllers/auth.controller";


const authRouter: Router = Router();

authRouter.post("/login", login);

authRouter.get("/verify", isValidToken, verifyToken)


export default authRouter;