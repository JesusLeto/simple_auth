import {NextFunction, Request, Response,} from 'express'
import {BodyRegister, UserRequest} from "../controllers/definition";


export function validationRequestBody(req: UserRequest<BodyRegister>, res: Response, next: NextFunction) {
    const {body} = req
    if (!(body.email && body.password && body.login)) next("value error")
    next()
}