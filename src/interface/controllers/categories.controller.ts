import type { Request, Response } from 'express';
import { CategoriesUseCase } from '../../application/categories.use-case.ts';
import { parsePagination } from '../../application/pagination.ts';
import type { ICategoryRepository } from '../../domain/repository/ICategory.repository.ts';
import { CategoriesPostgresRepository } from '../../infrastructure/repository/categories.pg.repository.ts';
import { requireUser } from '../middlewares/auth.middleware.ts';
import { handleError } from '../middlewares/error.handler.ts';

const repository: ICategoryRepository = new CategoriesPostgresRepository()
const useCase = new CategoriesUseCase(repository)

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { page, limit } = parsePagination(req.query.page, req.query.limit)
    const name = typeof req.query.name === 'string' && req.query.name.trim() ? req.query.name.trim() : undefined
    res.status(200).json(await useCase.getAll({ page, limit, name }));
  } catch (error) {
    handleError(error, res);
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await useCase.getById(req.params.id as string));
  } catch (error) {
    handleError(error, res);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    res.status(201).json(await useCase.create(req.body, String(requireUser(req).id)));
  } catch (error) {
    handleError(error, res);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await useCase.update(req.params.id as string, req.body, String(requireUser(req).id)));
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await useCase.delete(req.params.id as string, String(requireUser(req).id)));
  } catch (error) {
    handleError(error, res);
  }
};
