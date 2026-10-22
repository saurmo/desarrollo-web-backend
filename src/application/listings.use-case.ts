import type { AuthUser } from "../domain/models/User.ts";
import type { ListingFilterOptions } from "../domain/models/Listing.ts";
import type { IListingRepository } from "../domain/repository/IListings.repository.ts";
import { ListingDto } from "../infrastructure/dtos/listing.dto.ts";
import { BadRequest } from "./errors/bad-request.error.ts";
import { ForbiddenError } from "./errors/forbidden.error.ts";

export class ListingsUseCase {
  private listingRepository: IListingRepository

  constructor(listingRepository: IListingRepository) {
    this.listingRepository = listingRepository
  }

  async getAll(filters: ListingFilterOptions = {}) {
    // Si no se indican page y limit, se asume la primera página de 10
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const { data, total } = await this.listingRepository.findAll({
      ...filters,
      page,
      limit,
      offset: limit * (page - 1),
      state: 'ACTIVE',
    });
    return {
      pagination: {
        total,
        currentPage: page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data
    };
  }

  async getById(id: string | null) {
    if (!id || id.length === 0) {
      throw new Error('bad_request, ID is required');
    }
    const data = await this.listingRepository.findById(id);
    if (!data) {
      throw new Error('not_found, Listing not found');
    }
    return { data };
  }

  async create(payload: Record<string, unknown>, actor: AuthUser) {
    // Se validan los datos y solo se aceptan los campos permitidos
    const dto = new ListingDto(payload ?? {})
    const errors = await dto.validateDto()
    if (errors.length > 0) {
      throw new BadRequest("Error en datos", errors.map(error => error.constraints))
    }
    // El dueño de la propiedad es quien la crea: sale del token, no del body
    const data = await this.listingRepository.create(dto.toInput(), String(actor.id));
    return { message: 'Listing created successfully', data };
  }

  async deleteById(id: string | null, actor: AuthUser) {
    const { data: listing } = await this.getById(id); // 404 si no existe o ya estaba eliminada
    // Regla de negocio: un owner solo elimina SUS propiedades; el admin puede eliminar cualquiera
    if (actor.role !== 'admin' && listing.createdBy !== String(actor.id)) {
      throw new ForbiddenError('Solo puedes eliminar las propiedades que tú creaste');
    }
    await this.listingRepository.softDelete(listing.id, String(actor.id));
    return { message: 'Listing deleted successfully' };
  }
}
