import express, { Request, Response } from "express";
import loggerMiddleware from "./interfaces/middlewares/logger";
import notFoundMiddleware from "./interfaces/middlewares/notFound";
import usersRouter from "./interfaces/routers/users.router";
import authRouter from "./interfaces/routers/auth.router";
import dotenv from 'dotenv'
import { authMiddleware } from "./interfaces/middlewares/auth.middleware";

dotenv.config()

const app = express()

app.use(express.json())

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