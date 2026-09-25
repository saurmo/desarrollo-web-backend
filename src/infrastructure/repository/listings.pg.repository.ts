import type { CreateListing, Listing, ListingFilterOptions } from "../../domain/models/Listing.ts";
import type { IListingRepository } from "../../domain/repository/IListings.repository.ts";
import prisma from "./client.ts";




export class ListingsPostgresRepository implements IListingRepository {
    async create(listing: CreateListing) {
        // insert into listings (name, location, price, capacity, comodities, weather, rating, photos, videos, categories, created_at, updated_at, created_by, updated_by, deleted_at, deleted_by) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        const data = await prisma.listings.create({
            data: { ...listing }
        });
        return data as unknown as Listing;

    }
    async findById(id: string) {
        // select * from listings where id = $1
        const data = await prisma.listings.findUnique({
            where: { id }
        });
        if (!data) {
            throw new Error('not_found, Listing not found');
        }
        return data as unknown as Listing;
    }
    async findAll(filters?: ListingFilterOptions) {
        const total = await prisma.listings.count(
            { where: { state: filters?.state ?? 'ACTIVE' } }
        );
        const data = await prisma.listings.findMany({
            where: { state: filters?.state ?? 'ACTIVE' },
            take: filters?.limit ?? 10,
            skip: filters?.offset ?? 0
        });
        return { data: data as unknown as Listing[], total: total };

    }
    update(id: string, listing: Partial<Listing>, updatedBy: string): Promise<Listing> {
        throw new Error("Method not implemented.");
    }
    async softDelete(id: string, updatedBy: string): Promise<boolean> {
        // update listings set state = 'REMOVED', updated_by = $1 where id = $2
        const data = await prisma.listings.update({
            where: { id },
            data: { state: 'REMOVED', updated_by: updatedBy }
        });

        console.log(data);
        return data as unknown as boolean;
    }

}