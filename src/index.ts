
import AppExpress, { Express } from "express";
import userRouter from "./routers/users.router";
import taskRouter from "./routers/tasks.router";
import authRouter from "./routers/auth.router";
import { setConfig } from "./config/settings";


const app: Express = AppExpress()
const PORT: number = 3001
setConfig()
console.log(

    process.env
)

app.use(AppExpress.json())

app.get("/", (req, res) => {
    return res.send("Hola Mundo")
})
app
    .use(authRouter)
    .use(userRouter)
    .use(taskRouter)


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