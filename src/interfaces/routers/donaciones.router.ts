import { Router } from 'express';
import { crearDonacionHandler } from '../controllers/donaciones.controller';
import { conditionalDonacionUploadMiddleware } from '../middlewares/conditionalDonacionUpload.middleware';

const router = Router();

router.post('/', conditionalDonacionUploadMiddleware, crearDonacionHandler);

export default router;
