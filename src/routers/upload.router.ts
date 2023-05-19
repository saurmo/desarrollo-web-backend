import AppExpress, { Express } from "express";

import { Router } from "express";
import { createUpload, getOneUpload, getUploads } from "../controllers/uploads.controller";
import path from "path";


const uploadRouter: Router = Router();


uploadRouter.post("/uploads/profile", createUpload);
uploadRouter.get("/uploads", getUploads);
uploadRouter.get("/uploads/profile", getOneUpload);




export default uploadRouter;