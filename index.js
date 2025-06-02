import app from "./server.js"
import http from "http"
import dotenv from "dotenv"
import { init_db } from "./db/index.js"
dotenv.config()

const PORT = process.env.PORT || 8000

init_db()

const server = http.createServer(app)
server.listen(PORT, () => {
    console.log("Listening on PORT " + PORT)
})