import {ErrorRequestHandler, NextFunction, Request, Response,} from 'express'

export function errorMiddleware(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        return res.status(500).send({error})
}