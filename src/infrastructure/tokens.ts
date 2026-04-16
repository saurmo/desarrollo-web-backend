import { verify, sign } from "jsonwebtoken";
import { User } from "../domain/User";




export const createToken = (payload: User) => {
    const { id, name, email } = payload
    const SECRET_KEY: string = process.env.SECRET_KEY as string
    const token = sign({ id, name, email }, SECRET_KEY, { expiresIn: '1h', })
    return token
}

export const verifyToken = (token: string) => {
    try {
        const SECRET_KEY: string = process.env.SECRET_KEY as string
        const tokenData = verify(token, SECRET_KEY)
        return tokenData
    } catch (error) {
        return null
    }

}