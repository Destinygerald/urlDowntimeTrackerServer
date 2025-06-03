import passport from "passport";
import dotenv from "dotenv"
import { addUser, getUser } from "../db/functions/user.js";
import { signResponse, verifyResponse } from "../utils/authtoken.js";
dotenv.config()

export const auth = passport.authenticate("google", {scope: ["profile", "email"] })


export const authCallback =  passport.authenticate("google", { 
    failureRedirect: `${process.env.SERVER_URL}/api/auth/failed` 
})

export async function authCallbackAction (req, res) {
    const { user } =  req
    
    const userExist = await getUser(user.emails[0].value);

    if (!userExist) {
        await addUser(user.emails[0].value, user.displayName);
    }

    const token = signResponse(user);

    return res.redirect(`${process.env.CLIENT_DASHBOARD_URL}/?token=${token}`)
}


export function authCallbackFailed (req, res) {
    return res.status(401).json({
        error: true,
        message: "Login Failure"
    })
}

export function profile (req, res) {
    const authToken = req.headers["authorization"].split(' ')
    
    if (!authToken) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Authorization header missing'
        })
    }

    let token;
    if (authToken[1].at(authToken[1].length - 1) == ';') {
        token = authToken[1].slice(0, authToken[1].length - 1)
    } else {
        token = authToken[1]
    }

    const verify = verifyResponse(token)

    if (!verify) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Invalid token Credentials'
        })
    }

    return res.status(200).json({
        status: "success",
        data: verify
    })
}