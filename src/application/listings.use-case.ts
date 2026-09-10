import type { Listing, ListingFilterOptions } from "../domain/models/Listing.ts";
import type { IListingRepository } from "../domain/repository/IListings.repository.ts";

export class ListingsUseCase {
    private  listingRepository: IListingRepository
    
  constructor(listingRepository:IListingRepository) {
    this.listingRepository= listingRepository
  }

  async getAll(filters: ListingFilterOptions = {}): Promise<{ data: Listing[]; total: number }> {
    const searchOptions: ListingFilterOptions = {
      state: 'ACTIVE',
      limit: 10,
      offset: 0,
      ...filters,
    };

    return await this.listingRepository.findAll(searchOptions);
  }
}