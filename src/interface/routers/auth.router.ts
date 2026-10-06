import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { AuthUseCase } from "../../application/auth.use-case.ts";

const router = Router();

// Inyección de dependencias
// const userRepository = new PrismaUserRepository();
// const bcryptService = new BcryptService();
// const jwtService = new JwtService();

 const authUseCase = new AuthUseCase(userRepository, bcryptService, jwtService);
 const authController = new AuthController(authUseCase);

// Ruta pública para autenticación
router.post('/login', authController.login);

// Ejemplo de ruta protegida usando el middleware de verificación
// router.get('/me', authenticateToken, (req, res) => {
//   res.json({ data: (req as any).user });
// });

export default router;