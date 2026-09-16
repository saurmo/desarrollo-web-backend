
import { type Request, type Response } from 'express';
import type { User } from '../../domain/models/User.ts';
import { UsersUseCase } from '../../application/users.use-case.ts';
import type { IUserRepository } from '../../domain/repository/IUser.repository.ts';
import { UserPgRepository } from '../../infrastructure/repository/users.pg.repository.ts';

const repository: IUserRepository = new UserPgRepository()
const useCase = new UsersUseCase(repository)

export const getUsers = async (req: Request, res: Response) => {
  try {

    const response = await useCase.getAll()
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