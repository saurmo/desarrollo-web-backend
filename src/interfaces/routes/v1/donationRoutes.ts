import { Router } from 'express';
import { create, listAll, listMine } from '../../controllers/donationsController';
import { authenticate, requireRole } from '../../middlewares/authMiddleware';
import { validateDto } from '../../middlewares/validateDto';
import { uploadDonationReceipt } from '../../middlewares/uploadMiddleware';
import { CreateDonationDto } from '../../../infrastructure/validators/donations/CreateDonationDto';

const router = Router();

router.use(authenticate);

router.get('/mine', requireRole('donante', 'admin'), listMine);
router.get('/', requireRole('admin'), listAll);
router.post(
  '/',
  requireRole('donante', 'admin'),
  uploadDonationReceipt,
  validateDto(CreateDonationDto),
  create
);

export default router;
