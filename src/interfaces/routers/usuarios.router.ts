import { Router } from 'express';
import {
  getAllUsuariosHandler,
  getOneUsuarioHandler,
  createUsuarioHandler,
  updateUsuarioHandler,
  removeUsuarioHandler,
  imageProfileHandler,
} from '../controllers/usuarios.controller';
import { imageProfileMiddleware } from '../middlewares/uploadFiles.middleware';

const router = Router();

router.get('/usuarios', getAllUsuariosHandler);
router.post('/usuarios/:id/perfil', imageProfileMiddleware, imageProfileHandler);
router.post('/usuarios', createUsuarioHandler);
router.get('/usuarios/:id', getOneUsuarioHandler);
router.put('/usuarios/:id', updateUsuarioHandler);
router.delete('/usuarios/:id', removeUsuarioHandler);

export default router;
