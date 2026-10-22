import express, { type Express, type Request, type Response } from 'express';

import listingRoutes from "./interface/routers/listings.router.ts"
import usersRoutes from "./interface/routers/users.router.ts"
import authRoutes from "./interface/routers/auth.router.ts"
import categoriesRoutes from "./interface/routers/categories.router.ts"
import { errorMiddleware, notFoundHandler } from "./interface/middlewares/global.handlers.ts"
import cors from "cors"

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'API is running',
  });
});

// Middleware es global: express.json() permite capturar el json de los bodies
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000", "https://listings-app-nine.vercel.app"]
}))


// Montar las rutas bajo el prefijo /api/listings
app.use('/api/auth', authRoutes );
app.use('/api/listings', listingRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);

// Siempre al final: primero la ruta que no existe (404) y luego los errores no capturados
app.use(notFoundHandler);
app.use(errorMiddleware);

const PORT=process.env["PORT"] || 3001
app.listen(PORT,()=>{
    console.log(`Api runnig: http://localhost:${PORT}`)
});