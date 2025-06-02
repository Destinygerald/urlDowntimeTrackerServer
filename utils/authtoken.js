import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export function signResponse (response) {
    const token =  jwt.sign(response, process.env.SIGNATURE);
    return token;
}

export function verifyResponse (token) {
    const response = jwt.verify(token, process.env.SIGNATURE);
    return response;
}