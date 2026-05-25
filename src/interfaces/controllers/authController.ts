import { Request, Response, NextFunction } from 'express';
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from '../../infrastructure/security/BcryptPasswordHasher';
import { RegisterUser } from '../../application/usecases/auth/RegisterUser';
import { LoginUser } from '../../application/usecases/auth/LoginUser';
import { RegisterUserDto } from '../../infrastructure/validators/auth/RegisterUserDto';
import { LoginUserDto } from '../../infrastructure/validators/auth/LoginUserDto';

const userRepository = new PrismaUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const registerUser = new RegisterUser(userRepository, passwordHasher);
const loginUser = new LoginUser(userRepository, passwordHasher);

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as RegisterUserDto;
    const result = await registerUser.execute(dto);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as LoginUserDto;
    const result = await loginUser.execute(dto);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
