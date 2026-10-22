import { type Request, type Response } from 'express';
import { ListingsUseCase } from '../../application/listings.use-case.ts';
import { parseListingFilters } from '../../application/listing-filters.ts';
import { parsePagination } from '../../application/pagination.ts';
import type { IListingRepository } from '../../domain/repository/IListings.repository.ts';
import { ListingsPostgresRepository } from '../../infrastructure/repository/listings.pg.repository.ts';
import { requireUser } from '../middlewares/auth.middleware.ts';
import { handleError } from '../middlewares/error.handler.ts';

const repository: IListingRepository = new ListingsPostgresRepository()
const useCase = new ListingsUseCase(repository)

export const getListings = async (req: Request, res: Response) => {
  try {
    // page, limit y los filtros inválidos (0, -1, "abc") responden 400 en lugar de llegar a Prisma
    const { page, limit } = parsePagination(req.query.page, req.query.limit)
    const filters = { ...parseListingFilters(req.query), page, limit }
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
    const data = await useCase.create(req.body, requireUser(req))
    res.status(201).json(data);
  } catch (error) {
    handleError(error, res);
  }
};

// TODO (tarea): implementar la actualización. Hoy responde 200 sin guardar nada.
export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    res.status(200).json({ message: `Propiedad ${id} actualizada`, data: updateData });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await useCase.deleteById(id as string, requireUser(req))
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
};
