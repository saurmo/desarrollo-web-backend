import { randomUUID } from "node:crypto";
import type { Category, CategoryFilterOptions, CategoryInput } from "../../domain/models/Category.ts";
import type { ICategoryRepository } from "../../domain/repository/ICategory.repository.ts";
import prisma from "./client.ts";

export class CategoriesPostgresRepository implements ICategoryRepository {

  async findAll(filters: CategoryFilterOptions) {
    const where = {
      state: 'ACTIVE',
      // Filtro opcional: contiene el texto, sin importar mayúsculas
      ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' as const } }),
    };
    const [total, rows] = await Promise.all([
      prisma.categories.count({ where }),
      prisma.categories.findMany({
        where,
        orderBy: { name: 'asc' },
        take: filters.limit,
        skip: filters.limit * (filters.page - 1),
      }),
    ]);
    return { total, data: rows.map(this.mapToDomain) };
  }

  async findById(id: string) {
    // findFirst porque también se filtra por state (findUnique solo acepta campos únicos)
    const row = await prisma.categories.findFirst({ where: { id, state: 'ACTIVE' } });
    return row ? this.mapToDomain(row) : null;
  }

  async findByName(name: string) {
    // Comparación sin mayúsculas: "Playa" y "playa" cuentan como el mismo nombre
    const row = await prisma.categories.findFirst({ where: { name: { equals: name, mode: 'insensitive' } } });
    return row ? this.mapToDomain(row) : null;
  }

  async create(category: CategoryInput, createdBy: string) {
    const row = await prisma.categories.create({
      data: {
        id: randomUUID(), // la columna es VARCHAR(36) sin valor por defecto
        name: category.name,
        description: category.description ?? null,
        created_by: createdBy,
      },
    });
    return this.mapToDomain(row);
  }

  async update(id: string, category: CategoryInput, updatedBy: string) {
    const row = await prisma.categories.update({
      where: { id },
      data: {
        name: category.name,
        description: category.description ?? null,
        updated_by: updatedBy,
        updated_at: new Date(),
      },
    });
    return this.mapToDomain(row);
  }

  async softDelete(id: string, updatedBy: string) {
    await prisma.categories.update({
      where: { id },
      data: { state: 'REMOVED', deleted_at: new Date(), updated_by: updatedBy, updated_at: new Date() },
    });
  }

  // Convierte la fila de la base de datos (snake_case) al modelo de dominio (camelCase)
  private mapToDomain(row: {
    id: string; name: string; description: string | null; state: string;
    created_at: Date | null; updated_at: Date | null; created_by: string; updated_by: string | null;
  }): Category {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      state: row.state === 'REMOVED' ? 'REMOVED' : 'ACTIVE',
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      createdBy: row.created_by,
      updatedBy: row.updated_by,
    };
  }
}
