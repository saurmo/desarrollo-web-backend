
import { type Request, type Response } from 'express';
import type { User, UserFilterOptions } from '../../domain/models/User.ts';
import { UsersUseCase } from '../../application/users.use-case.ts';
import type { IUserRepository } from '../../domain/repository/IUser.repository.ts';
import { UserPgRepository } from '../../infrastructure/repository/users.pg.repository.ts';
import { BcryptService } from '../../infrastructure/services/bcrypt.service.ts';
import { handleError } from '../middlewares/error.handler.ts';

const repository: IUserRepository = new UserPgRepository()
const bcryptService = new BcryptService();
const useCase = new UsersUseCase(repository, bcryptService)

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
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await useCase.getById(id as string) 
    res.json(data);
  } catch (error) {
    handleError(error, res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await useCase.create(req.body)
    res.status(201).json(data);
  } catch (error) {
    handleError(error, res);
  }
};

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const updateData: Partial<User> = req.body;
//     res.status(200).json({ message: `Propiedad ${id} actualizada`, data: updateData });
//   } catch (error) {
//     handleError(error, res);
//   }
// };

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await useCase.deleteById(id as string) // { data }
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
};