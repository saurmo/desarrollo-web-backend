import type { Listing, ListingFilterOptions } from "../../domain/models/Listing.ts";
import type { IListingRepository } from "../../domain/repository/IListings.repository.ts";
import prisma from "./client.ts";



  export class ListingsPostgresRepository implements IListingRepository{
      create(listing: Omit<Listing, "id" | "createdAt" | "updatedAt">): Promise<Listing> {
          throw new Error("Method not implemented.");
      }
      findById(id: string): Promise<Listing | null> {
          throw new Error("Method not implemented.");
      }
     async findAll(filters?: ListingFilterOptions){
          const response = await prisma.listings.findMany({ });
          console.log(response)
          return response as unknown as { data: Listing[]; total: number; }

      }
      update(id: string, listing: Partial<Listing>, updatedBy: string): Promise<Listing> {
          throw new Error("Method not implemented.");
      }
      softDelete(id: string, updatedBy: string): Promise<boolean> {
          throw new Error("Method not implemented.");
      }

  }