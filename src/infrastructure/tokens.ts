import { sign, verify } from "jsonwebtoken";
import { User } from "../domain/User";


export const createToken = (user: User) => {
    const payload = {
        id: user.id,
        name: user.name,
        role: user.role
    }
    const SECRET_KEY = process.env.SECRET_KEY
    const token = sign(payload, SECRET_KEY, { expiresIn: '1h' })
    return token
}


export const verifyToken = (token: string) => {

    try {
        const SECRET_KEY = process.env.SECRET_KEY
        const tokenData = verify(token, SECRET_KEY)
        return tokenData
    } catch (error) {
        // token invalido
        return null
    }

}