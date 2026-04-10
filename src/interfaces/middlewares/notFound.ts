import { Request, Response, NextFunction } from 'express'

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        message: 'Not Found'
    })
}

export default notFoundMiddleware