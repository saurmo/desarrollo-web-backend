
import jwt from "jsonwebtoken";
import type { User } from "../../domain/models/User.ts";

const JWT_SECRET: string = process.env["JWT_SECRET"] || "b52aed86-3f01-4687-bbbe-09542c82b7ad"

export class JwtService {


    generateToken(user: User) {
        return jwt.sign({
            id: user.id,
            identification: user.identification,
            nombre: user.name,
            email: user.email,
            role: user.role
        }, JWT_SECRET, { expiresIn: 60 * 60 })
    }

    verifyToken(token: string) {
        return jwt.verify(token, JWT_SECRET)
    }

}