
import { Router } from "express";
import { createSubject, deleteSubject, getOneSubject, getSubjects, updateSubject } from "../controllers/subjects.controller";

const subjectRouter: Router = Router()
const path ="/subjects"

subjectRouter.get(`${path}`, getSubjects)
    .get(`${path}/:id`, getOneSubject)
    .post(`${path}`, createSubject)
    .put(`${path}/:id`, updateSubject)
    .delete(`${path}/:id`, deleteSubject)

export default subjectRouter;