import type { Request, Response } from 'express';
import type { AuthUseCase } from '../../application/auth.use-case.ts';
import { requireUser } from '../middlewares/auth.middleware.ts';
import { handleError } from '../middlewares/error.handler.ts';

export class AuthController {

  private authUseCase: AuthUseCase

  constructor(authUserCase: AuthUseCase) {
    this.authUseCase = authUserCase
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body ?? {};
      if (!email || !password) {
        res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
        return;
      }

      const result = await this.authUseCase.loginUser({ email, password });
      res.status(200).json({ data: result });
    } catch (error) {
      handleError(error, res);
    }
  };

  // GET /api/auth/me — devuelve el usuario del token (requiere authenticate)
  me = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.authUseCase.getProfile(requireUser(req).id);
      res.status(200).json(result);
    } catch (error) {
      handleError(error, res);
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const payload = req.body;
      const result = await this.authUseCase.registerUser(payload);
      res.status(200).json({ data: result });
    } catch (error) {
      handleError(error, res);
    }
  };

}
