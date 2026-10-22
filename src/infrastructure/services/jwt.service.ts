import 'dotenv/config';
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../application/errors/unauthorized.error.ts";
import type { AuthToken, AuthUser, User } from "../../domain/models/User.ts";

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

    /**
     * Verifica la firma y la expiración del token y devuelve el usuario que contiene.
     * Cualquier problema (firma falsa, token vencido, payload incompleto) lanza UnauthorizedError → 401.
     */
    verifyToken(token: string): AuthUser {
        let payload: string | jwt.JwtPayload
        try {
            payload = jwt.verify(token, JWT_SECRET!)
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new UnauthorizedError('El token expiró. Inicia sesión de nuevo')
            }
            throw new UnauthorizedError('Token inválido')
        }
        if (!this.isAuthUser(payload)) {
            throw new UnauthorizedError('Token inválido')
        }
        const { id, identification, name, email, role } = payload
        return { id, identification, name, email, role }
    }

    // Comprueba que el payload tenga la forma de AuthUser (un token firmado por otro sistema podría no tenerla)
    private isAuthUser(payload: string | jwt.JwtPayload): payload is jwt.JwtPayload & AuthUser {
        return typeof payload !== 'string'
            && typeof payload.id === 'number'
            && typeof payload.email === 'string'
            && ['admin', 'user', 'owner'].includes(payload.role)
    }

}