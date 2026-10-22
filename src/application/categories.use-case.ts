import type { CategoryFilterOptions } from "../domain/models/Category.ts";
import type { ICategoryRepository } from "../domain/repository/ICategory.repository.ts";
import { CategoryDto } from "../infrastructure/dtos/category.dto.ts";
import { BadRequest } from "./errors/bad-request.error.ts";
import { ConflictError } from "./errors/conflict.error.ts";

export class CategoriesUseCase {
  private categoryRepository: ICategoryRepository

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  async getAll(filters: CategoryFilterOptions) {
    const { data, total } = await this.categoryRepository.findAll(filters);
    return {
      pagination: {
        total,
        currentPage: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(total / filters.limit),
      },
      data
    };
  }

  async getById(id: string) {
    const data = await this.categoryRepository.findById(id);
    if (!data) {
      throw new Error('not_found, Categoría no encontrada');
    }
    return { data };
  }

  async create(payload: Record<string, unknown>, actorId: string) {
    const dto = await this.validate(payload);
    await this.ensureNameIsFree(dto.name);
    const data = await this.categoryRepository.create(dto.toInput(), actorId);
    return { data };
  }

  async update(id: string, payload: Record<string, unknown>, actorId: string) {
    await this.getById(id); // 404 si no existe o está eliminada
    const dto = await this.validate(payload);
    await this.ensureNameIsFree(dto.name, id);
    const data = await this.categoryRepository.update(id, dto.toInput(), actorId);
    return { data };
  }

  async delete(id: string, actorId: string) {
    await this.getById(id); // 404 si no existe o ya estaba eliminada
    await this.categoryRepository.softDelete(id, actorId);
    return { message: 'Categoría eliminada' };
  }

  // Valida el body con el DTO; si hay errores responde 400 con el detalle por campo
  private async validate(payload: Record<string, unknown>) {
    const dto = new CategoryDto(payload ?? {});
    const errors = await dto.validateDto();
    if (errors.length > 0) {
      throw new BadRequest("Error en datos", errors.map(error => error.constraints));
    }
    return dto;
  }

  // Regla de negocio: el nombre es único. Se revisan también las eliminadas,
  // porque la columna tiene @unique y la base de datos rechazaría el duplicado.
  private async ensureNameIsFree(name: string, currentId?: string) {
    const existing = await this.categoryRepository.findByName(name);
    if (!existing || existing.id === currentId) return;
    if (existing.state === 'REMOVED') {
      throw new ConflictError(`Ya existe una categoría eliminada llamada "${name}"`);
    }
    throw new ConflictError(`Ya existe una categoría llamada "${name}"`);
  }
}
