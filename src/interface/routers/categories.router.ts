import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categories.controller.ts";
import { authenticate, authorize } from "../middlewares/auth.middleware.ts";

const router: Router = Router()

// Consultar es público (las categorías se usan para filtrar propiedades)
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Administrar categorías es solo para admin: 401 sin sesión, 403 con otro rol
router.post('/', authenticate, authorize('admin'), createCategory);
router.put('/:id', authenticate, authorize('admin'), updateCategory);
router.delete('/:id', authenticate, authorize('admin'), deleteCategory); // borrado lógico

export default router
