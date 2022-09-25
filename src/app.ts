import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import cors from 'cors'
import router from "./router/routes";
import {client} from "./dataBase/connectionDB";
import 'dotenv/config'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use("/api", router)

app.listen(process.env.PORT, async () => {
    try {
        await client.connect()
    } catch (e) {
        console.log("DB error connection")
    }
})