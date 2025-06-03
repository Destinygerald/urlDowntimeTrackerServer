import express from "express"
import { asyncWrapper, authUser } from "../middleware.js"
import { addSiteFn, allSites, getSiteinfo, removeSite, toggleCron, urlDownTimeInfo } from "../controllers/urls.js"

const Route = express.Router()

Route.use(authUser)

Route.get("/", asyncWrapper(allSites))
Route.post("/add", asyncWrapper((addSiteFn)))
Route.delete("/delete/:id", asyncWrapper(removeSite))
Route.put("/toggle-watch/:id", asyncWrapper(toggleCron))
Route.get("/:id", asyncWrapper(getSiteinfo))
Route.get("/:id/downtimes", asyncWrapper(urlDownTimeInfo))

export default Route