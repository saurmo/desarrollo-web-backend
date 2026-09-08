import { Router } from "express";
import { createListing, deleteListing, getListingById, getListings, updateListing } from "../controllers/listings.controller.ts";

const router:Router = Router()

// router
// .get("/listings", )
// .get("/listings/:id")
// .post("/listings")
// .put("/listings")
// .delete("/listings")

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', createListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

export default router