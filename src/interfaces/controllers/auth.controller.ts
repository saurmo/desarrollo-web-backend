import { Request, Response } from "express"
import { users } from "../data/users.data"
import { User } from "../../domain/User"
import { createToken } from "../../infrastructure/tokens"


export const loginHandler = (req: Request, res: Response) => {
    const { email, password } = req.body
    // validar exista
    let userFound: User | null = null
    // for (let i = 0; i < users.length; i++) {
    //     const user = users[i];
    //     if (user.email === email && user.password === password) {
    //         userFound = user
    //     }
    // }
    userFound = users.find(x => x.email === email && x.password === password)
    if (!userFound) {
        res.status(404).send({
            message: 'user not found'
        })
    }

    const token = createToken(userFound)
    res.status(200).json({
        message: 'success',
        data: {
            id: userFound.id,
            name: userFound.name, 
            token
        }
    })
}
