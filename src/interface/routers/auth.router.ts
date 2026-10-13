import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { AuthUseCase } from "../../application/auth.use-case.ts";
import { UserPgRepository } from "../../infrastructure/repository/users.pg.repository.ts";
import { BcryptService } from "../../infrastructure/services/bcrypt.service.ts";
import { JwtService } from "../../infrastructure/services/jwt.service.ts";

const router = Router();

// Inyección de dependencias : Implementación de infrastructure
 const userRepository = new UserPgRepository();
 const bcryptService = new BcryptService();
const jwtService = new JwtService();

 const authUseCase = new AuthUseCase(userRepository, bcryptService, jwtService);
 
 const authController = new AuthController(authUseCase);

// Ruta pública para autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);

// Ejemplo de ruta protegida usando el middleware de verificación
// router.get('/me', authenticateToken, (req, res) => {
//   res.json({ data: (req as any).user });
// });

export default router;