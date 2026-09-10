import type { Listing, ListingFilterOptions } from "../models/Listing.ts";

export interface IListingRepository {
  create(listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>): Promise<Listing>;
  findById(id: string): Promise<Listing | null>;
  findAll(filters?: ListingFilterOptions): Promise<{ data: Listing[]; total: number }>;
  update(id: string, listing: Partial<Listing>, updatedBy: string): Promise<Listing>;
  softDelete(id: string, updatedBy: string): Promise<boolean>;
}