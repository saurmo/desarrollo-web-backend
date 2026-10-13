import type { Request, Response } from 'express';
import type { AuthUseCase } from '../../application/auth.use-case.ts';
import { BadRequest } from '../../application/errors/bad-request.error.ts';

export class AuthController {

  private authUseCase: AuthUseCase

  constructor(authUserCase: AuthUseCase) {
    this.authUseCase = authUserCase
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'El email y la contraseña son obligatorios' });
        return;
      }

      const result = await this.authUseCase.loginUser({ email, password });
      res.status(200).json({ data: result });
    } catch (error: any) {
      if (error.message === 'Credenciales inválidas' || error.message === 'El usuario se encuentra inactivo') {
        res.status(401).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Error interno del servidor' });
    }

  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const payload = req.body;
      const result = await this.authUseCase.registerUser(payload);
      res.status(200).json({ data: result });
    } catch (error: any) {
      if (error instanceof BadRequest) {
        res.status(400).json(error.print());
        return
      }
      console.error(error)
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

}