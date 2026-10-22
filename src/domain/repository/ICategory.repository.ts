import type { Category, CategoryFilterOptions, CategoryInput } from "../models/Category.ts";

export interface ICategoryRepository {
  /** Lista solo las categorías activas, con paginación y filtro opcional por nombre. */
  findAll(filters: CategoryFilterOptions): Promise<{ data: Category[]; total: number }>;
  /** Busca una categoría activa por id. */
  findById(id: string): Promise<Category | null>;
  /** Busca por nombre, incluidas las eliminadas (el nombre es único en la tabla). */
  findByName(name: string): Promise<Category | null>;
  create(category: CategoryInput, createdBy: string): Promise<Category>;
  update(id: string, category: CategoryInput, updatedBy: string): Promise<Category>;
  /** Borrado lógico: cambia state a REMOVED, no borra la fila. */
  softDelete(id: string, updatedBy: string): Promise<void>;
}
