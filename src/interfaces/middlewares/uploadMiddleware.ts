import type { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { upload } from '../../infrastructure/upload/multerConfig';
import { ValidationError } from '../../domain/errors/DomainError';

const handleMulterError = (err: unknown, next: NextFunction): boolean => {
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      next(new ValidationError('El archivo supera el tamaño máximo (5 MB).'));
      return true;
    }
    next(new ValidationError(err.message));
    return true;
  }
  if (err instanceof Error) {
    next(new ValidationError(err.message));
    return true;
  }
  return false;
};

export const uploadSingleFile = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err: unknown) => {
      if (handleMulterError(err, next)) return;
      next();
    });
  };
};

export const uploadDonationReceipt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contentType = (req.headers['content-type'] ?? '').toLowerCase();
  if (!contentType.includes('multipart/form-data')) {
    return next();
  }
  upload.single('comprobante')(req, res, (err: unknown) => {
    if (handleMulterError(err, next)) return;
    next();
  });
};
