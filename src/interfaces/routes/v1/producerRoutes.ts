import { Router } from 'express';
import { create } from '../../controllers/producersController';
import { validateDto } from '../../middlewares/validateDto';
import { CreateProducerDto } from '../../../infrastructure/validators/producers/CreateProducerDto';

const router = Router();

router.post('/', validateDto(CreateProducerDto), create);

export default router;
