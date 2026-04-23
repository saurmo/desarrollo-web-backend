import { Router } from 'express';
import { crearProductorHandler } from '../controllers/productores.controller';

const router = Router();

router.post('/', crearProductorHandler);

export default router;
