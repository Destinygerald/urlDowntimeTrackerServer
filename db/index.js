import mongoose from "mongoose";
import dotenv from "dotenv"
import { init_cron } from "../utils/cron.js";
dotenv.config()

export function init_db () {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() =>  {
            console.log('Database Connected Successful')
            init_cron()
        })
        .catch(err => {
            console.log('Database Failed: ', err)
            
            setTimeout(() => {
                init_db()
            }, 3000)
        })
}