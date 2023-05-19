
import AppExpress, { Express } from "express";
import cors from "cors"
import fileUpload from "express-fileupload";
import userRouter from "./routers/users.router";
import taskRouter from "./routers/tasks.router";
import authRouter from "./routers/auth.router";
import { setConfig } from "./config/settings";
import myDataSource from "./app-data-source";
import subjectRouter from "./routers/subjects.router";
import { isValidToken, verifyToken } from "./controllers/auth.controller";
import { JwtService } from "./business/services/jwt.services";
import uploadRouter from "./routers/upload.router";
import path from "path";

const app: Express = AppExpress()
const PORT: number = 3001
setConfig()

// myDataSource
//     .initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })

app.use(cors())

app.use(AppExpress.json())

app.use(fileUpload(
    
))



app.get("/", (req, res) => {
    return res.send("Hola Mundo")

})


app.use(authRouter)
    .use(userRouter)
    app.use("/uploads", AppExpress.static('docs'))
app.use(isValidToken)
app.use(taskRouter)
    .use(subjectRouter)
    .use(uploadRouter)
    


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