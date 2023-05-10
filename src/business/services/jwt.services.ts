
import { JwtPayload, sign, verify } from "jsonwebtoken";

export class JwtService {
    private SECRET_KEY: string = "7a229c91-460d-4491-b239-c3aa66c1d065"

    createToken(payload: object): string {
        return sign(payload, this.SECRET_KEY, { expiresIn: '1h' })
    }

    verifyToken(token: string): string | undefined | JwtPayload {
        try {
            const infoToken = verify(token, this.SECRET_KEY);
            return infoToken
        } catch (error) {
            throw error
        }
    }

}