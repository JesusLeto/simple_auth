import {UserDtoInterface} from "../../dtoUser/definition";
import jwt from "jsonwebtoken"
import {deleteRefreshToken, getUserByRefreshToken, saveRefreshToken} from "./queries";
import {ApiError} from "../../error";

class TokenService {

    accessToken = ""
    refreshToken = ""

    async generateTokens(params: UserDtoInterface) {
        // @ts-ignore
        this.accessToken = jwt.sign({...params}, process.env.ACCESS_SECRET_KEY, {expiresIn: 60 * 15});
        // @ts-ignore
        this.refreshToken = jwt.sign({...params}, process.env.REFRESH_SECRET_KEY, {expiresIn: "60d"});

        await saveRefreshToken(params.email, this.refreshToken)
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        }
    }

    async refresh(refreshToken: string) {
       const user =  await getUserByRefreshToken(refreshToken);
       // @ts-ignore
       const checkRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
       if (!user || !checkRefreshToken) throw ApiError.Unauthorized();
       return await this.generateTokens({email: user.email, isActivate: user.isActivate})
    }

    async deleteRefreshToken(refreshToken: string) {
        const resultDelete = await deleteRefreshToken(refreshToken)
        if (!resultDelete) throw ApiError.BadRequest("Token error");
        return null
    }
}

export default new TokenService()
