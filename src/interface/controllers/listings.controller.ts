
import { type Request, type Response } from 'express';
import type { Listing } from '../../domain/models/Listing.ts';
import { ListingsUseCase } from '../../application/listings.use-case.ts';
import type { IListingRepository } from '../../domain/repository/IListings.repository.ts';
import { ListingsPostgresRepository } from '../../infrastructure/repository/listings.pg.repository.ts';

export const getListings = async (req: Request, res: Response) => {
  try {
    const repository: IListingRepository=new ListingsPostgresRepository()
    const useCase = new ListingsUseCase(repository)
  const response=  await useCase.getAll()
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las propiedades' });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: `Obtener propiedad con ID: ${id}` });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la propiedad' });
  }
};

export const createListing = async (req: Request, res: Response) => {
  try {
    const listingData: Omit<Listing, 'id'> = req.body;
    res.status(201).json({ message: 'Propiedad creada exitosamente', data: listingData });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la propiedad' });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<Listing> = req.body;
    res.status(200).json({ message: `Propiedad ${id} actualizada`, data: updateData });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la propiedad' });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    res.status(200).json({ message: `Propiedad ${id} eliminada` });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
  }
};