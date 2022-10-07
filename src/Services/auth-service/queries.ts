import {client} from "../../dataBase/connectionDB";
import {userParams} from "./definition";

export async function checkUser(email: string): Promise<userParams> {
    const query = "SELECT * FROM accounts WHERE email = $1"
    const {rows} = await client.query(query, [email])
    return rows[0]
}

export async function registerNewUser(params: userParams) {
    const query = "INSERT INTO accounts(login, email, password, activate_link, recovery_password_link, is_active) " +
        "VALUES($1, $2, $3, $4, $5, $6)"
    const {rows} = await client.query(query, [...Object.values(params)])
    return rows[0]
}
