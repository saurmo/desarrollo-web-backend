import { Router } from 'express';
import {
  getAllUsuariosHandler,
  getOneUsuarioHandler,
  createUsuarioHandler,
  updateUsuarioHandler,
  removeUsuarioHandler,
} from '../controllers/usuarios.controller';

const router = Router();

router.get('/usuarios', getAllUsuariosHandler);
router.post('/usuarios', createUsuarioHandler);
router.get('/usuarios/:id', getOneUsuarioHandler);
router.put('/usuarios/:id', updateUsuarioHandler);
router.delete('/usuarios/:id', removeUsuarioHandler);

export default router;
