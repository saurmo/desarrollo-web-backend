
import AppExpress, { Express } from "express";
import userRouter from "./routers/users.router";

const app: Express = AppExpress()
const PORT: number = 3001

app.get("/", (req, res) => {
    return res.send("Hola Mundo")
})
app.use(userRouter)

// Middleware 404
app.use((req, res)=>{
    return res.status(404).json({
        ok:false,
        message:"404 Path no encontrado"
    })
})


app.listen(PORT, () => {
    console.log(`Api Tasks en ejecución: http://localhost:${PORT}`);
})