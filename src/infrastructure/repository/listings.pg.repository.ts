import { randomUUID } from "node:crypto";
import type { Listing, ListingFilterOptions, ListingInput } from "../../domain/models/Listing.ts";
import type { IListingRepository } from "../../domain/repository/IListings.repository.ts";
import prisma from "./client.ts";

export class ListingsPostgresRepository implements IListingRepository {

    async create(listing: ListingInput, createdBy: string) {
        const data = await prisma.listings.create({
            data: {
                id: randomUUID(), // la columna es VARCHAR(36) sin valor por defecto
                name: listing.name,
                location: listing.location,
                price: listing.price,
                capacity: listing.capacity,
                weather: listing.weather,
                photos: listing.photos,
                videos: listing.videos,
                created_by: createdBy,
            }
        });
        return this.mapToDomain(data);
    }

    async findById(id: string) {
        // findFirst porque se filtra también por state (findUnique solo acepta campos únicos)
        const data = await prisma.listings.findFirst({
            where: { id, state: 'ACTIVE' }
        });
        return data ? this.mapToDomain(data) : null;
    }

    async findAll(filters?: ListingFilterOptions) {
        // Los filtros opcionales solo se agregan al where si vienen
        const where = {
            state: filters?.state ?? 'ACTIVE',
            ...(filters?.location && { location: { contains: filters.location, mode: 'insensitive' as const } }),
            ...((filters?.minPrice !== undefined || filters?.maxPrice !== undefined) && {
                price: {
                    ...(filters?.minPrice !== undefined && { gte: filters.minPrice }),
                    ...(filters?.maxPrice !== undefined && { lte: filters.maxPrice }),
                },
            }),
            ...(filters?.capacity !== undefined && { capacity: { gte: filters.capacity } }),
            // Relación con la tabla intermedia: propiedades que pertenecen a esa categoría
            ...(filters?.categoryId && { listing_categories: { some: { category_id: filters.categoryId } } }),
        };
        const [total, rows] = await Promise.all([
            prisma.listings.count({ where }),
            prisma.listings.findMany({
                where,
                // Orden determinista: sin él, la base puede repetir o saltarse filas entre páginas
                orderBy: [{ created_at: 'desc' }, { id: 'asc' }],
                take: filters?.limit ?? 10,
                skip: filters?.offset ?? 0,
            }),
        ]);
        return { data: rows.map((row) => this.mapToDomain(row)), total };
    }

    // TODO (tarea): implementar la actualización de una propiedad
    update(id: string, listing: Partial<Listing>, updatedBy: string): Promise<Listing> {
        throw new Error("Method not implemented.");
    }

    async softDelete(id: string, updatedBy: string): Promise<void> {
        await prisma.listings.update({
            where: { id },
            data: { state: 'REMOVED', deleted_at: new Date(), updated_by: updatedBy, updated_at: new Date() }
        });
    }

    // Convierte la fila (snake_case) al modelo de dominio (camelCase).
    // Prisma devuelve los DECIMAL como objetos: se pasan a número para que el JSON traiga 730000 y no "730000".
    private mapToDomain(row: {
        id: string; name: string; location: string; price: { toString(): string }; capacity: number;
        weather: string; rating: { toString(): string } | null; photos: unknown; videos: unknown; state: string;
        created_at: Date | null; created_by: string; updated_at: Date | null; updated_by: string | null;
    }): Listing {
        return {
            id: row.id,
            name: row.name,
            location: row.location,
            price: Number(row.price),
            capacity: row.capacity,
            weather: row.weather,
            rating: Number(row.rating ?? 0),
            photos: Array.isArray(row.photos) ? row.photos as string[] : [],
            videos: Array.isArray(row.videos) ? row.videos as string[] : [],
            state: row.state as Listing['state'],
            createdAt: row.created_at,
            createdBy: row.created_by,
            updatedAt: row.updated_at,
            updatedBy: row.updated_by,
        };
    }
}
