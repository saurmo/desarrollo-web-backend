import 'dotenv/config';
import jwt from "jsonwebtoken";
import type { AuthToken, User } from "../../domain/models/User.ts";

// Sin valor por defecto: si falta la variable, la API no debe arrancar con un secreto conocido.
const JWT_SECRET = process.env["JWT_SECRET"]
if (!JWT_SECRET) {
    throw new Error("Falta la variable de entorno JWT_SECRET");
}

const EXPIRES_IN_SECONDS = 60 * 60

export class JwtService {


    generateToken(user: User): AuthToken {
        const accessToken = jwt.sign({
            id: user.id,
            identification: user.identification,
            name: user.name,
            email: user.email,
            role: user.role
        }, JWT_SECRET!, { expiresIn: EXPIRES_IN_SECONDS })
        return { accessToken, tokenType: 'Bearer', expiresIn: EXPIRES_IN_SECONDS }
    }

    verifyToken(token: string) {
        return jwt.verify(token, JWT_SECRET!)
    }

}