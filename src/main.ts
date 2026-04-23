import express, { Request, Response } from "express"; // importar express
import { config  } from "dotenv";
// middleware
import loggerMiddleware from "./interfaces/middlewares/logger";
import notFoundMiddleware from "./interfaces/middlewares/notFound";

import usersRouter from "./interfaces/routers/users.router";
import authRouter from "./interfaces/routers/auth.router";
import dotenv from 'dotenv'
import { authMiddleware } from "./interfaces/middlewares/auth.middleware";

dotenv.config()

config() // metodo que carga las variables de entorno .env

const app = express() // inicializando express

app.use(express.json())  // middleware para capturar el json

app.get('/hello', (req: Request, res: Response) => {
    res.send({
        message: 'hello'
    })
})

// Uso del middleware
app.use(loggerMiddleware)

app.use(authRouter)

app.use(authMiddleware)
app.use(usersRouter)


app.use(notFoundMiddleware)


const PORT = 3000
app.listen(PORT, () => {
    console.log('Servidor escuchando en: http://localhost:3000');
})