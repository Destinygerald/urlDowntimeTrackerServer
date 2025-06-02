import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { errorHandler, catchUnknownRoute } from "./middleware.js"
import configuration from "./utils/passport.js";
import AuthRoute from "./route/auth.js"
import UrlRoute from "./route/urls.js"
import { config as configDotenv } from "dotenv";

configDotenv()

const app = express()

app.use(express.json())
app.use(cors({
	origin: '*',
	credentials: true	
}))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))


app.use(passport.initialize())
app.use(passport.session())

configuration(passport)

app.use('/api/auth', AuthRoute)
app.use('/api/url', UrlRoute)

app.use(catchUnknownRoute)
app.use(errorHandler)

export default app;