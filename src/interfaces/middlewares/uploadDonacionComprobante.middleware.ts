import type { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';
import { allowedMime, upload } from '../../domain/UploadFiles.types';



/**
 * Acepta un archivo opcional en el campo multipart `comprobante` (PDF o imagen).
 */
export function uploadDonacionComprobanteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  upload.single('comprobante')(req, res, (err: unknown) => {
    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ message: 'El archivo supera el tamaño máximo (5 MB).' });
        return;
      }
      res.status(400).json({ message: err.message });
      return;
    }
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
    next();
  });
}
