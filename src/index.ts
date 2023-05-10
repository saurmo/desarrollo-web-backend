
import AppExpress, { Express } from "express";
import cors from "cors"

import userRouter from "./routers/users.router";
import taskRouter from "./routers/tasks.router";
import authRouter from "./routers/auth.router";
import { setConfig } from "./config/settings";
import myDataSource from "./app-data-source";
import subjectRouter from "./routers/subjects.router";
import { verifyToken } from "./controllers/auth.controller";
import { JwtService } from "./business/services/jwt.services";

const app: Express = AppExpress()
const PORT: number = 3001
setConfig()

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use(cors())

app.use(AppExpress.json())


app.get("/", (req, res) => {
    return res.send("Hola Mundo")

})


app
    .use(authRouter)
// Middleware valid token
app.use((req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if (token) {
            const user = new JwtService().verifyToken(token)
            next()
        }
        else {
            res.status(400).send("No pass middleware")
        }
    } catch (error: any) {
        if (error.message === "invalid token" || error.message === 'jwt expired') {
            return res.status(401).send({})
        }
        return res.status(500).send({})
    }

})

app
    .use(userRouter)
    .use(taskRouter)
    .use(subjectRouter)


// Middleware 404
app.use((req, res) => {
    return res.status(404).json({
        ok: false,
        message: "404 Path no encontrado"
    })
})


app.listen(PORT, () => {
    console.log(`Api Tasks en ejecución: http://localhost:${PORT}`);
})