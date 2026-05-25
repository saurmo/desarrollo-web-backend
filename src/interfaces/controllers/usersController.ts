import { Request, Response, NextFunction } from 'express';
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository';
import { buildFileStorage } from '../../infrastructure/storage';
import { GetAllUsers } from '../../application/usecases/users/GetAllUsers';
import { GetUserById } from '../../application/usecases/users/GetUserById';
import { UpdateUser } from '../../application/usecases/users/UpdateUser';
import { DeleteUser } from '../../application/usecases/users/DeleteUser';
import { UpdateUserProfilePhoto } from '../../application/usecases/users/UpdateUserProfilePhoto';
import { UpdateUserDto } from '../../infrastructure/validators/users/UpdateUserDto';

const userRepository = new PrismaUserRepository();
const fileStorage = buildFileStorage();
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const updateProfilePhoto = new UpdateUserProfilePhoto(userRepository, fileStorage);

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers.execute();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getUserById.execute(req.params.id as string);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as UpdateUserDto;
    const user = await updateUser.execute(req.params.id as string, dto);
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUser.execute(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const uploadProfilePhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateProfilePhoto.execute({
      userId: req.params.id as string,
      file: req.file,
    });
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};
