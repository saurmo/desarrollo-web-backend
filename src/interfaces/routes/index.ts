import { Router } from 'express';
import authRoutes from './v1/authRoutes';
import userRoutes from './v1/userRoutes';
import producerRoutes from './v1/producerRoutes';
import donationRoutes from './v1/donationRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/producers', producerRoutes);
router.use('/donations', donationRoutes);

router.get('/', (_req, res) => {
  res.json({ version: '1.0', message: 'API Donaciones v1' });
});

export default router;
