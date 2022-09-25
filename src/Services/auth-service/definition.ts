import {UserDtoInterface} from "../../dtoUser/definition";

export interface userParams {
    login: string,
    email: string,
    password: string,
    activateLink: string,
    recoveryPasswordLink: string,
    isActivate: boolean
}

export interface resultRegisterData extends UserDtoInterface {
    accessToken: string,
    refreshToken: string
}