import { Router } from 'express';
import { crearDonacionHandler } from '../controllers/donaciones.controller';

const router = Router();

router.post('/', crearDonacionHandler);

export default router;
