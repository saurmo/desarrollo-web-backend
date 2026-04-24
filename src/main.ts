import 'dotenv/config';
import express from 'express';
import cors from "cors";

import loggerMiddleware from './interfaces/middlewares/logger';
import notFoundMiddleware from './interfaces/middlewares/notFound';
import usuariosRouter from './interfaces/routers/usuarios.router';
import authRouter from './interfaces/routers/auth.router';
import productoresRouter from './interfaces/routers/productores.router';
import donacionesRouter from './interfaces/routers/donaciones.router';
import { authMiddleware } from './interfaces/middlewares/auth.middleware';


const app = express();

app.use(cors()); 
app.use(express.json());
app.use(loggerMiddleware);



const v1 = '/api/v1'

// Rutas públicas (sin autenticación)
app.use(v1, authRouter);

// Rutas protegidas
// app.use(authMiddleware);
app.use(v1, usuariosRouter);
app.use(`${v1}/productores`, productoresRouter);
app.use(`${v1}/donaciones`, donacionesRouter);

app.use(notFoundMiddleware);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});
