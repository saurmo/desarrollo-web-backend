import { Router } from "express";
import { createListing, deleteListing, getListingById, getListings, updateListing } from "../controllers/listings.controller.ts";
import { authenticate, authorize } from "../middlewares/auth.middleware.ts";

const router: Router = Router()

// Consultar es público: lo ve cualquier visitante de la página
router.get('/', getListings);
router.get('/:id', getListingById);

// Modificar exige sesión (401) y rol admin u owner (403).
// Además, el caso de uso verifica que un owner solo toque sus propias propiedades.
router.post('/', authenticate, authorize('admin', 'owner'), createListing);
router.put('/:id', authenticate, authorize('admin', 'owner'), updateListing) // PENDIENTE TAREA
router.delete('/:id', authenticate, authorize('admin', 'owner'), deleteListing);

export default router
