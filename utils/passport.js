import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from "dotenv"
dotenv.config()

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const SECRET = process.env.GOOGLE_CLIENT_SECRET
const CALLBACK_URL = process.env.CALLBACK_URL || '/api/auth/google/callback'

export default function configuration (passport) {
    passport.use(new GoogleStrategy({
            clientID: CLIENT_ID,
            clientSecret: SECRET,
            callbackURL: CALLBACK_URL,
            scope: ["profile", "email"]
        },
        function(accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    ))



    passport.serializeUser((user, done) => {
        done(null, user)
    });

    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}