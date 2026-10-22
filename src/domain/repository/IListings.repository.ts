import type { Listing, ListingFilterOptions, ListingInput } from "../models/Listing.ts";

export interface IListingRepository {
  create(listing: ListingInput, createdBy: string): Promise<Listing>;
  /** Devuelve null si no existe o si fue eliminada (state REMOVED). */
  findById(id: string): Promise<Listing | null>;
  findAll(filters?: ListingFilterOptions): Promise<{ data: Listing[]; total: number }>;
  update(id: string, listing: Partial<Listing>, updatedBy: string): Promise<Listing>;
  /** Borrado lógico: cambia state a REMOVED y registra deleted_at. */
  softDelete(id: string, updatedBy: string): Promise<void>;
}
