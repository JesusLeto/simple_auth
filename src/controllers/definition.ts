import {Request} from "express";

export interface BodyLogin {
    email: string,
    password: string
}

export interface BodyRegister extends BodyLogin {
    login: string
}

export interface UserRequest<T> extends Request {
    body: T
}
