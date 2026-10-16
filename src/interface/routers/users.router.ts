import { Router } from "express";
import { getUsers, createUser, deleteUser, getUserById } from "../controllers/users.controller.ts";

const router:Router = Router()

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/:id/images', getUserById);
router.post('/', createUser);
// router.put('/:id', updateListing);
router.delete('/:id', deleteUser);

export default router