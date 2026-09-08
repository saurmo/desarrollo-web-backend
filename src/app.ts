import express, { type Express, type Request, type Response } from 'express';

import listingRoutes from "./interface/routers/listings.router.ts"

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(express.json());

// Montar las rutas bajo el prefijo /api/listings
app.use('/api/listings', listingRoutes);

const PORT=process.env["PORT"] || 3001
app.listen(PORT,()=>{
    console.log(`Api runnig: http://localhost:${PORT}`)
});