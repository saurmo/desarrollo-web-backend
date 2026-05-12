import type { NextFunction, Request, Response } from 'express';
import { uploadDonacionComprobanteMiddleware } from './uploadDonacionComprobante.middleware';

/**
 * Ejecuta Multer solo para multipart; si el cliente envía JSON, el body lo llena `express.json()`.
 */
export function conditionalDonacionUploadMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const ct = (req.headers['content-type'] ?? '').toLowerCase();
  if (ct.includes('multipart/form-data')) {
    uploadDonacionComprobanteMiddleware(req, res, next);
    return;
  }
  next();
}
