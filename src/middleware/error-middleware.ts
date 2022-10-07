import {NextFunction, Request, Response,} from 'express'
import {ApiError} from "../error";

export function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
        if (error instanceof ApiError) {
                return res.status(error.status).send(JSON.stringify({error: error.message}))
        }
        return res.status(error.status).send({error: error.message})
}
