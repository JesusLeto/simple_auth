import {Client} from "pg";

export const client = new Client(
    {
        user: '',
        host: 'localhost',
        database: 'postgres',
        password: '',
        port: 5432,
    }
)