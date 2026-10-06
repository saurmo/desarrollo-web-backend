import type { CreateListing, Listing, ListingFilterOptions } from "../domain/models/Listing.ts";
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

  async getById(id: string | null) {
    if (!id || id.length === 0) {
      throw new Error('bad_request, ID is required');
    }
    const data = await this.listingRepository.findById(id);
    return { data };
  }


  async deleteById(id: string | null) {
    if (!id || id.length === 0) {
      throw new Error('bad_request, ID is required');
    }
    const currentListing = await this.listingRepository.findById(id);
    if (!currentListing) {
      throw new Error('not_found: Listing not found');
    }
    // TODO: capturamos el usuario que esta eliminando la propiedad
    const data = await this.listingRepository.softDelete(id, 'system');
    return { message: 'Listing deleted successfully', data };
  }

  async create(listing: CreateListing) {
    // TODO: Validar la información de listing
    const createListing: CreateListing = {
      ...listing,
      state: 'ACTIVE',
      created_by:'system',
      created_at: new Date(),
    }
    const data = await  this.listingRepository.create(createListing);
    return { message: 'Listing created successfully', data };
  }  
}