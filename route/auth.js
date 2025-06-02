import express from "express"
import { asyncWrapper } from "../middleware.js"
import { authCallback, auth, authCallbackAction, authCallbackFailed } from "../controllers/auth.js"

const Route = express.Router()

Route.get('/', auth)
Route.get('/google/callback', authCallback, asyncWrapper(authCallbackAction))
Route.get('/failed', asyncWrapper(authCallbackFailed))

export default Route