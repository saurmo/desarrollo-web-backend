import type { AuthUser } from '../../domain/models/User.ts';

// Agrega la propiedad "user" a la petición de Express.
// La llena el middleware authenticate cuando el token es válido.
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
