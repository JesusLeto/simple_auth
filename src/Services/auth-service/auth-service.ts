import {BodyLogin, BodyRegister} from "../../controllers/definition";
import {checkUser, registerNewUser} from "./queries";
import DtoUser from "../../dtoUser/dtoUser";
import TokenService from '../token-service/token-service'
import {userParams} from "./definition";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

class AuthService {
    async register(userRegisterInfo: BodyRegister) {

        const res = await checkUser(userRegisterInfo.email)
        if (res) throw new Error("User already exist")

        const registerParams: userParams = {
            login: userRegisterInfo.login,
            email: userRegisterInfo.email,
            password: "",
            activateLink: "",
            recoveryPasswordLink: "",
            isActivate: false
        }

        registerParams.password = await bcrypt.hash(userRegisterInfo.password, 4)
        registerParams.activateLink = uuidv4()
        registerParams.recoveryPasswordLink = uuidv4()

        //TODO сделать обработку создания нового юзера
        await registerNewUser(registerParams)

        const userDTO = new DtoUser(registerParams)

        const tokens = await TokenService.generateTokens(userDTO)

        return {...userDTO, ...tokens}
    }

    async login(userLoginInfo: BodyLogin) {
        const res = await checkUser(userLoginInfo.email)
        if (!res) {
            throw new Error("User not found")
        }
        const checkPassword = await bcrypt.compare(userLoginInfo.password, res.password)
        if (!checkPassword) throw new Error("Password error")

        const userDTO = new DtoUser(res)
        return await TokenService.generateTokens(userDTO)
    }
}

export default new AuthService()
