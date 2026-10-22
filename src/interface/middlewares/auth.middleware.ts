import type { Request, RequestHandler } from 'express';
import { ForbiddenError } from '../../application/errors/forbidden.error.ts';
import { UnauthorizedError } from '../../application/errors/unauthorized.error.ts';
import type { AuthUser, UserRole } from '../../domain/models/User.ts';
import { JwtService } from '../../infrastructure/services/jwt.service.ts';
import { handleError } from './error.handler.ts';

const jwtService = new JwtService();

/**
 * Middleware de AUTENTICACIÓN: ¿quién eres?
 *
 * Lee el header "Authorization: Bearer <token>", verifica el JWT y deja el usuario en req.user.
 * Sin token o con un token inválido o vencido responde 401.
 */
export const authenticate: RequestHandler = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      throw new UnauthorizedError('Falta el header Authorization');
    }
    const [scheme, token] = header.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedError('El formato debe ser: Authorization: Bearer <token>');
    }
    req.user = jwtService.verifyToken(token);
    next();
  } catch (error) {
    handleError(error, res);
  }
};

/**
 * Middleware de AUTORIZACIÓN: ¿puedes hacer esto?
 *
 * Se usa DESPUÉS de authenticate, con los roles que sí tienen permiso:
 *   router.delete('/:id', authenticate, authorize('admin'), deleteUser)
 * Si el rol del usuario no está en la lista responde 403.
 */
export const authorize = (...roles: UserRole[]): RequestHandler => (req, res, next) => {
  if (!req.user) {
    // authorize sin authenticate antes: es un error de quien armó el router
    handleError(new UnauthorizedError('Debes iniciar sesión'), res);
    return;
  }
  if (!roles.includes(req.user.role)) {
    handleError(new ForbiddenError(`Tu rol (${req.user.role}) no tiene permiso para esta acción`), res);
    return;
  }
  next();
};

/** Devuelve el usuario autenticado de la petición; para usar en controladores de rutas protegidas. */
export const requireUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw new UnauthorizedError('Debes iniciar sesión');
  }
  return req.user;
};
