import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../infrastructure/tokens";

export const authMiddleware = (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')?.[1]
    const tokenData = verifyToken(token as string)
    req.userData=tokenData
    if (tokenData === null) {
        return res.status(401).json({
            success: false,
            message: "unauthorized",
        })
    }
    next()
}