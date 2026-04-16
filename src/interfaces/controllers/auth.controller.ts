
import { Request, Response } from "express"
import { users } from "../data/users"
import { createToken } from "../../infrastructure/tokens"
import { User } from "../../domain/User"



const loginHandler = (req: Request, res: Response) => {
    const { email, password } = req.body // capturar el body email, password
    // validar si envian el email y el password

    let userFound = null
    for (let id = 0; id < users.length; id++) {
        const user = users[id];
        if (email === user.email && password === user.password) {
            userFound = user
        }
    }
    if (userFound == null) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    // token 
    const token = createToken(userFound as User)
    res.send({
        success: false,
        message: "login success",
        data: { token }
    })

}

export { loginHandler }