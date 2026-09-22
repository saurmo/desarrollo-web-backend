import type { Listing, ListingFilterOptions } from "../domain/models/Listing.ts";
import type { IListingRepository } from "../domain/repository/IListings.repository.ts";

export class ListingsUseCase {
  private listingRepository: IListingRepository

  constructor(listingRepository: IListingRepository) {
    this.listingRepository = listingRepository
  }

  async getAll(filters: ListingFilterOptions = {}) {
    // calcular la page de acuerdo al offset y limit, si no se proporcionan, se asume page 1
    const page = filters.page ?? 1;
    const offset = (filters.limit ?? 10) * (page - 1);
    const searchOptions: ListingFilterOptions = {
      state: 'ACTIVE',
      limit: 10,
      offset,
      ...filters, // Sobre escribimos los valores por defecto con los filtros proporcionados
    };
    const { data, total } = await this.listingRepository.findAll(searchOptions);
    return {
      pagination: {
        total,
        currentPage: page,
        limit: searchOptions.limit,
        totalPages: Math.ceil(total / (searchOptions.limit ?? 10)),
      },
      data
    };
  }
}