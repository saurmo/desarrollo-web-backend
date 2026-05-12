import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';

import loggerMiddleware from './interfaces/middlewares/logger';
import notFoundMiddleware from './interfaces/middlewares/notFound';
import usuariosRouter from './interfaces/routers/usuarios.router';
import authRouter from './interfaces/routers/auth.router';
import productoresRouter from './interfaces/routers/productores.router';
import donacionesRouter from './interfaces/routers/donaciones.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



const v1 = '/api/v1'

// Rutas públicas (sin autenticación)
app.use(v1, authRouter);

// Rutas protegidas (authMiddleware deshabilitado en desarrollo)
app.use(v1, usuariosRouter);
app.use(`${v1}/productores`, productoresRouter);
app.use(`${v1}/donaciones`, donacionesRouter);

app.use(notFoundMiddleware);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
