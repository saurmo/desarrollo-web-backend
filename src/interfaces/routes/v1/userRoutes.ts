import { Router } from 'express';
import {
  getAll,
  getOne,
  update,
  remove,
  uploadProfilePhoto,
} from '../../controllers/usersController';
import { validateDto } from '../../middlewares/validateDto';
import { uploadSingleFile } from '../../middlewares/uploadMiddleware';
import { UpdateUserDto } from '../../../infrastructure/validators/users/UpdateUserDto';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', validateDto(UpdateUserDto), update);
router.delete('/:id', remove);
router.post('/:id/profile-photo', uploadSingleFile('foto'), uploadProfilePhoto);

export default router;
