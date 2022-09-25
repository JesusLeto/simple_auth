import {client} from "../../dataBase/connectionDB";
import {userParams} from "../auth-service/definition";

export async function saveRefreshToken(email: string, token: string) {
    const query = "UPDATE user_table SET refresh_token = $1 WHERE email = $2"
    const res = await client.query(query, [token, email])
    return res.rows.length
}

export async function getUserByRefreshToken(refreshToken: string): Promise<userParams>{
    const query = "SELECT * FROM user_table WHERE refresh_token = $1"
    const {rows} = await client.query(query, [refreshToken])
    return rows[0]
}

export async function deleteRefreshToken(refreshToken: string) {
    const query = "UPDATE user_table SET refresh_token = $1 WHERE refresh_token = $2 RETURNING *"
    const {rows} = await client.query(query, ["", refreshToken])
    return rows[0]
}