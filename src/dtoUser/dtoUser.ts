import {userParams} from "../Services/auth-service/definition";


export default class DtoUser {
    email = ""
    isActivate = false

    constructor(params: userParams) {
        this.email = params.email
        this.isActivate = !!params.isActivate
    }
}