import express, { json } from 'express';
import cors from 'cors';
import path from 'path';
import apiRouter from './interfaces/routes';
import { loggerMiddleware } from './interfaces/middlewares/logger';
import { errorHandler } from './interfaces/middlewares/errorMiddleware';
import { NotFoundError } from './domain/errors/DomainError';

const app = express();

app.use(cors());
app.use(json());
app.use(loggerMiddleware);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/v1', apiRouter);

app.use((req, _res, next) => {
  next(new NotFoundError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

export default app;
