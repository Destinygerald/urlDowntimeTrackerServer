import { addSite, allDownTimes, deleteSite, getSite, getUserSites, siteOwner, togglePaused } from "../db/functions/site.js"
import { pauseCron, runCron, scheduleCronJob } from "../utils/cron.js";
import { getStatus, parseUrl, validateUrlAccessibility } from "../utils/urlValidator.js"
import { v4 as uuidv4 } from 'uuid';


export async function addSiteFn (req, res) {
    const { url, duration } = req.body

    const parsedUrl = parseUrl(url)

    const { statusCode, isAccessible } = await validateUrlAccessibility(parsedUrl) 

    if (!isAccessible) {
        return res.status(400).json({
            status: "failed",
            message: `URL(${url}) is inaccessible`
        })
    }

    const cron_id = uuidv4();

    const siteStatus = getStatus(statusCode);
    
    const addedSite = await addSite(url, res.user._id, siteStatus, duration, cron_id)

    if (!addedSite._id) throw new Error("Failed to add site");

    scheduleCronJob(duration, url, cron_id, addedSite._id);

    return res.status(201).json({
        status: 'created',
        message: "successfully added site to your watch"
    })
}

export async function removeSite (req, res) {
    const { id } = req.params

    const site = await getSite(id)
    const ownerAccess = await siteOwner(id, res.user._id)

    if (!site || !ownerAccess) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid URL ID"
        })
    }

    await deleteSite(id);

    return res.status(200).json({
        status: "success",
        message: "Successfully changed url state"
    })

}


export async function allSites (req, res) {

    const result = await getUserSites(res.user._id)

    return res.status(200).json({
        status: "success",
        data: result
    })
}

export async function urlDownTimeInfo(req, res) {
    const { id } = req.params

    const site = await getSite(id)
    const ownerAccess = await siteOwner(id, res.user._id)

    if (!site || !ownerAccess) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid URL ID"
        })
    }

    const result = await allDownTimes(id)

    return res.status(200).json({
        status: "success",
        data: result
    })
}

export async function toggleCron (req, res) {
    const { id } = req.params

    const site = await getSite(id)
    const wasPaused = site.pause 
    const ownerAccess = await siteOwner(id, res.user._id)

    if (!site || !ownerAccess) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid URL ID"
        })
    }

    if (wasPaused) {
        runCron(site.cron_id)
    } else {
        pauseCron(site.cron_id)
    }
    
    await togglePaused(id)

    const currentState = wasPaused ? "running" : "paused"
    
    return res.status(200).json({
        status: "success",
        message: `cron now ${currentState}`
    })
}
