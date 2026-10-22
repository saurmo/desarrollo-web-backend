import { Router } from "express";
import { getUsers, createUser, deleteUser, getUserById } from "../controllers/users.controller.ts";
import { authenticate, authorize } from "../middlewares/auth.middleware.ts";

const router: Router = Router()

// Gestionar usuarios es una función del panel de administración:
// primero authenticate (401 sin token) y luego authorize (403 si el rol no es admin).
router.use(authenticate, authorize('admin'))

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
// TODO (tarea): router.put('/:id', updateUser)
router.delete('/:id', deleteUser); // borrado lógico

export default router
