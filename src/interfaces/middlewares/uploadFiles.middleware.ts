import type { NextFunction, Request, Response } from 'express';
import { upload } from '../../domain/UploadFiles.types';
import { MulterError } from 'multer';


export const imageProfileMiddleware = (req: Request,
    res: Response,
    next: NextFunction) => {
    upload.single('foto')(req, res, (err: unknown) => {
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
    })
}