import type { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';

const allowedMime = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
]);

/** Memoria: el controlador sube `req.file.buffer` a S3 (o guarda en disco como respaldo). */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedMime.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error('Solo se permiten archivos PDF o imagen (JPEG, PNG, GIF, WebP).'));
  },
});

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
