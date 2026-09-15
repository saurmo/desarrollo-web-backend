import express, { type Express, type Request, type Response } from 'express';

import listingRoutes from "./interface/routers/listings.router.ts"
import cors from 'cors'
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Middleware - Permite capturar los json del body express.json()
app.use(express.json());

app.use(cors({
  origin:'http://localhost:3000'
}))

// Montar las rutas bajo el prefijo /api/listings
app.use('/api/listings', listingRoutes);

const PORT=process.env["PORT"] || 3001
app.listen(PORT,()=>{
    console.log(`Api runnig: http://localhost:${PORT}`)
});