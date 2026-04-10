import { Request, Response, NextFunction } from 'express'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const url = req.url
    console.log('Interceptando request....', url);
    next()
}

export default loggerMiddleware