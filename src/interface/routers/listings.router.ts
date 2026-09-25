import { Router } from "express";
import { createListing, deleteListing, getListingById, getListings, updateListing } from "../controllers/listings.controller.ts";

const router:Router = Router()


router.get('/', getListings); //OK
router.get('/:id', getListingById); // OK
router.post('/', createListing); // ok 
router.put('/:id', updateListing) // PENDIENTE TAREA 
router.delete('/:id', deleteListing); // OK

export default router