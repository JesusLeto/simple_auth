import {Client} from "pg";

export const client = new Client(
    {
        user: 'kirya',
        host: 'localhost',
        database: 'authdb',
        password: "mypass",
        port: 5432,
    }
)