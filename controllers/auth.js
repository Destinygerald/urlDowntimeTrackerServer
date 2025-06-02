import passport from "passport";
import dotenv from "dotenv"
import { addUser, getUser } from "../db/functions/user.js";
import { signResponse } from "../utils/authtoken.js";
dotenv.config()

export const auth = passport.authenticate("google", {scope: ["profile", "email"] })


export const authCallback =  passport.authenticate("google", { 
    // successRedirect: process.env.CLIENT_DASHBOARD_URL, 
    failureRedirect: `${process.env.SERVER_URL}/api/auth/failed` 
})

export async function authCallbackAction (req, res) {
    const { user } =  req
    
    const userExist = await getUser(user.emails[0].value);

    if (!userExist) {
        await addUser(user.emails[0].value, user.displayName);
    }

    const token = signResponse(user);

    return res.status(200).json({
        status: 'success',
        auth_token: token
    })
}


export function authCallbackFailed (req, res) {
    return res.status(401).json({
        error: true,
        message: "Login Failure"
    })
}