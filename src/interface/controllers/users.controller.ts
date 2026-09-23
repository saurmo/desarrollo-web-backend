
import { type Request, type Response } from 'express';
import type { User, UserFilterOptions } from '../../domain/models/User.ts';
import { UsersUseCase } from '../../application/users.use-case.ts';
import type { IUserRepository } from '../../domain/repository/IUser.repository.ts';
import { UserPgRepository } from '../../infrastructure/repository/users.pg.repository.ts';

const repository: IUserRepository = new UserPgRepository()
const useCase = new UsersUseCase(repository)

export const getUsers = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const filters: UserFilterOptions = {
      limit,
      page
    }
    const response = await useCase.getAll(filters)
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    
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
    const listingData: Omit<User, 'id'> = req.body;
    res.status(201).json({ message: 'Propiedad creada exitosamente', data: listingData });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la propiedad' });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<User> = req.body;
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