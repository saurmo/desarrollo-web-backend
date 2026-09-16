import { Router } from "express";
import { createListing, deleteListing, getListingById, getListings, updateListing } from "../controllers/listings.controller.ts";
import { getUsers } from "../controllers/users.controller.ts";

const router:Router = Router()

router.get('/', getUsers);
router.get('/:id', getListingById);
router.post('/', createListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

export default router