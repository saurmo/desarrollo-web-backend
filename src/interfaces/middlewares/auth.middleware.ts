
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../../infrastructure/tokens'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")?.[1]
    // verificar token
    const tokenData = verifyToken(token)

    if (!tokenData) {
        res.status(401).send({
            message: "unauthorized"
        })
    }

    // token ok
    next()

}