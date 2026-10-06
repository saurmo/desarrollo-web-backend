
import { type Request, type Response } from 'express';
import type { CreateListing, Listing, ListingFilterOptions } from '../../domain/models/Listing.ts';
import { ListingsUseCase } from '../../application/listings.use-case.ts';
import type { IListingRepository } from '../../domain/repository/IListings.repository.ts';
import { ListingsPostgresRepository } from '../../infrastructure/repository/listings.pg.repository.ts';

const repository: IListingRepository = new ListingsPostgresRepository()
const useCase = new ListingsUseCase(repository)

const handleError = (error: Error | unknown, res: Response) => {
  if (error instanceof Error && error.message.includes('bad_request')) {
    res.status(400).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('not_found')) {
    res.status(404).json({ error: error.message });
  }
  if (error instanceof Error && error.message.includes('already_exists')) {
    res.status(409).json({ error: error.message });
  }
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}

export const getListings = async (req: Request, res: Response) => {
  try {
    const filters: ListingFilterOptions = {}
    // Operador ternario ( ---condicion--- ?  sentencia true : sentencia false)
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    if (limit !== undefined) {
      filters.limit = limit;
    }
    if (page !== undefined) {
      filters.page = page || 1; // Si no se proporciona page, se asume 1
    }
    const response = await useCase.getAll(filters) // { pagination, data }
    res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await useCase.getById(id as string) // { data }
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
};

export const createListing = async (req: Request, res: Response) => {
  try {
    const currentListing = await useCase.getById(req.body.id)
    if (currentListing) {
      throw new Error('already_exists: Listing already exists');
    }
    const listingData: CreateListing = req.body;
    const data = await useCase.create(listingData)
    res.status(201).json(data);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<Listing> = req.body;
    res.status(200).json({ message: `Propiedad ${id} actualizada`, data: updateData });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await useCase.deleteById(id as string) // { data }
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
};