import express, { Request, Response } from "express";
import loggerMiddleware from "./interfaces/middlewares/logger";
import notFoundMiddleware from "./interfaces/middlewares/notFound";

const app = express()

app.use(express.json())

app.get('/hello', (req: Request, res: Response) => {
    res.send({
        message: 'hola mundo'
    })
})

// Uso del middleware
app.use(loggerMiddleware)

// /usuarios?page=1
app.get('/usuarios', (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string)
    if (Number.isNaN(page) || page < 0) {
        return res.status(400).send({
            message: 'Page not valid'
        })
    }
    res.status(200).json({
        pagination: {
            page
        },
        usuarios: []
    })
})

app.get('/usuarios/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).json({
        usuarios: {
            id
        }
    })
})

app.post('/usuarios', (req: Request, res: Response) => {
    const payload = req.body
    res.status(201).json({
        message: 'usuario creado',
        usuario: payload
    })
})

app.put('/usuarios/:id', (req: Request, res: Response) => {
    // capturar el id
    // capturar el json
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
})

app.delete('/usuarios/:id', (req: Request, res: Response) => {
    // capturar el id
    res.status(200).json({
        usuarios: {
            id: ''
        }
    })
})

app.use(notFoundMiddleware)


const PORT = 3000
app.listen(PORT, () => {
    console.log('Servidor escuchando en: http://localhost:3000');
})