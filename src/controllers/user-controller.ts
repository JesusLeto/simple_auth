import {NextFunction, Request, Response} from "express";
import {UserRequest, BodyLogin, BodyRegister} from "./definition";
import AuthService from "../Services/auth-service/auth-service"
import TokenService from '../Services/token-service/token-service'
import {resultRegisterData} from "../Services/auth-service/definition";


class UserController {

    async login(req: UserRequest<BodyLogin>, res: Response, next: NextFunction) {
        let tokens = {
            accessToken: "",
            refreshToken: ""
        }

        try {
            tokens = await AuthService.login(req.body)
            res.cookie("refresh_token", tokens.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
        } catch (e) {
            // @ts-ignore
            return next(e.message)
        }
        return res.status(200).send({accessToken: tokens.accessToken})
    }

    async register(req: UserRequest<BodyRegister>, res: Response, next: NextFunction) {
        let result: resultRegisterData = {
            email: "",
            isActivate: false,
            accessToken: "",
            refreshToken: ""
        }

        try {
            result = await AuthService.register(req.body)
            res.cookie("refresh_token", result.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
        } catch (e) {
            // @ts-ignore
            return next(e.message)
        }
        return res.status(200).send(result)
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        const {refresh_token} = req.cookies
        try {
            await TokenService.deleteRefreshToken(refresh_token)
        } catch (e) {
            // @ts-ignore
            return next(e.message)
        }
        return res.status(200).send(JSON.stringify(null))
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        const {refresh_token} = req.cookies
        let result = {
            accessToken: "",
            refreshToken: ""
        }
        try {
            result = await TokenService.refresh(refresh_token)
            res.cookie("refresh_token", result.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
        } catch (e) {
            // @ts-ignore
            return next("Not authorized")
        }
        return res.status(200).send({accessToken: result.accessToken})
    }
}

export default new UserController()