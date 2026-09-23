import express, { type Express, type Request, type Response } from 'express';

import listingRoutes from "./interface/routers/listings.router.ts"
import usersRoutes from "./interface/routers/users.router.ts"
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
  origin:["http://localhost:3000", "https://listings-app-nine.vercel.app/"]
}))


// Montar las rutas bajo el prefijo /api/listings
app.use('/api/listings', listingRoutes);
app.use('/api/users', usersRoutes);

const PORT=process.env["PORT"] || 3001
app.listen(PORT,()=>{
    console.log(`Api runnig: http://localhost:${PORT}`)
});