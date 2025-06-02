import { Site } from "../models/site.js";
import { Downtime } from "../models/downtime.js";



export async function addSite (site, userId, status, duration, cron_id) {
    return await Site.create({ 
        website: site,
        date_added: Date.now(),
        cron_duration: duration,
        cron_id: cron_id,
        userId: userId,
        running: status == "up"
    })
}

export async function getSite (id) {
    return await Site.findOne({ _id: id})
}

export async function siteOwner (id, userId) {
    return await Site.findOne({ _id: id, userId: userId})
}

export async function getUserSites (userId) {
    return await Site.find({ userId: userId })
}

export async function togglePaused (id) {
    const site = await getSite(id)
    
    site.pause = !site.pause
    await site.save()
}


export async function deleteSite(id) {
    return await Site.deleteOne({ _id: id })
}


export async function allDownTimes (siteId) {
    return await Downtime.find({ siteId: siteId })
}

export async function addDowntime(statusCode) {
    
}
