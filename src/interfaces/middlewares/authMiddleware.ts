import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../infrastructure/config/jwt';
import { DomainError, UnauthorizedError } from '../../domain/errors/DomainError';
import { UserRole } from '../../domain/entities/User';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return next(new UnauthorizedError('Token de autenticación requerido'));
  }

  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return next(new UnauthorizedError('Formato de token inválido (esperado: Bearer <token>)'));
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    req.userName = payload.name;
    req.userEmail = payload.email;
    req.userRole = payload.role;
    next();
  } catch {
    next(new UnauthorizedError('Token inválido o expirado'));
  }
};

export const requireRole = (...allowed: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return next(new UnauthorizedError('Sesión requerida'));
    }
    if (!allowed.includes(req.userRole)) {
      return next(new DomainError('No tienes permiso para acceder a este recurso', 403));
    }
    next();
  };
};
