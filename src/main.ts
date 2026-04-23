import 'dotenv/config';
import express from 'express';
import loggerMiddleware from './interfaces/middlewares/logger';
import notFoundMiddleware from './interfaces/middlewares/notFound';
import usuariosRouter from './interfaces/routers/usuarios.router';
import authRouter from './interfaces/routers/auth.router';
import { authMiddleware } from './interfaces/middlewares/auth.middleware';
import cors from "cors";
const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());
// Rutas públicas (sin autenticación)
app.use('/api/v1', authRouter);

// Rutas protegidas
// app.use(authMiddleware);
app.use('/api/v1', usuariosRouter);

app.use(notFoundMiddleware);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
