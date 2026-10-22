
import { type Request, type Response } from 'express';
import type { UserFilterOptions } from '../../domain/models/User.ts';
import { UsersUseCase } from '../../application/users.use-case.ts';
import type { IUserRepository } from '../../domain/repository/IUser.repository.ts';
import { UserPgRepository } from '../../infrastructure/repository/users.pg.repository.ts';
import { BcryptService } from '../../infrastructure/services/bcrypt.service.ts';
import { requireUser } from '../middlewares/auth.middleware.ts';
import { handleError } from '../middlewares/error.handler.ts';
import { parsePagination } from '../../application/pagination.ts';

const repository: IUserRepository = new UserPgRepository()
const bcryptService = new BcryptService();
const useCase = new UsersUseCase(repository, bcryptService)

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page, limit } = parsePagination(req.query.page, req.query.limit)
    // Filtro opcional ?role=admin|user|owner; cualquier otro valor responde 400
    const role = typeof req.query.role === 'string' ? req.query.role : undefined
    if (role && !['admin', 'user', 'owner'].includes(role)) {
      throw new Error('bad_request, role debe ser admin, user u owner')
    }
    const filters: UserFilterOptions = { page, limit, role }
    const response = await useCase.getAll(filters)
    res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await useCase.deleteById(id as string, requireUser(req))
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
};