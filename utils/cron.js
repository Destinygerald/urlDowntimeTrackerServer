import cron from 'node-cron';
import axios from 'axios';
import { addDowntime, getSite } from '../db/functions/site.js';
import { parseUrl } from './urlValidator.js';
import { Site } from '../db/models/site.js';

let CRON_JOBS = []

export function scheduleCronJob (duration, url, id, siteId) { 

    let schedule = "* * * * *"
    
    switch (duration.toLowerCase()) {
        case "every 30 mins":
            schedule = `0/30 * * * *`
            break;
        case "hourly":
            schedule = "0 * * * *"
            break;
        case "every 6 hours":
            schedule = `* */6 * * *`
            break;
        case "daily":
            schedule = "0 0 * * *"
            break;
        case "weekly":
            schedule = "0 0 * * 0 "
            break;
        default:
            schedule = `* * * * *`;
    }

    const job = cron.schedule(schedule, async() => {

        const response = await axios.head(parseUrl(url))

        const statusCode = response.status;
        const isAccessible = statusCode >= 200 && statusCode < 400;

        console.log("Ran Cron")

        if (!isAccessible) {
            await addDowntime(statusCode)
        }
    });

    CRON_JOBS.push({
        id: id,
        cron: job,
        siteId: siteId,
        url: url
    })
}

// wrap this in a try catch block to catch the error
export function pauseCron (id) {
    if (!CRON_JOBS.find(job => job.id == id)) {
        throw new Error("Invalid Id")
    }

    CRON_JOBS.map(job => {
        if (job.id == id) {
            job.cron.stop()
        }
    })
    
}


// wrap this in a try catch block to catch the error
export function runCron (id) {
    if (!CRON_JOBS.find(job => job.id == id)) {
        throw new Error("Invalid Id")
    }

    CRON_JOBS.map(job => {
        if (job.id == id) {
            job.cron.start()
        }
    })
}

// wrap this in a try catch block to catch the error
export function deleteCron (id) {
    if (!CRON_JOBS.find(job => job.id == id)) {
        throw new Error("Invalid Id")
    }

    CRON_JOBS.map(job => {
        if (job.id == id) {
            job.cron.destroy()
        }
    })

    CRON_JOBS = CRON_JOBS.filter(jobs => jobs.id != id)
}


export async function init_cron () {
    const allSites = await Site.find({})

    allSites.map(site => {

        let schedule = "*/10 * * * *"
    
        switch (site.cron_duration.toLowerCase()) {
            case "every 30 mins":
                schedule = `0/30 * * * *`
                break;
            case "hourly":
                schedule = "0 * * * *"
                break;
            case "every 6 hours":
                schedule = `* */6 * * *`
                break;
            case "daily":
                schedule = "0 0 * * *"
                break;
            case "weekly":
                schedule = "0 0 * * 0 "
                break;
            default:
                schedule = `*/10 * * * *`;
        }

        const job = cron.schedule(schedule, async() => {
            const response = await axios.head(parseUrl(site.website))
            const statusCode = response.status;
            const isAccessible = statusCode >= 200 && statusCode < 400;
        
            if (!isAccessible) {await addDowntime(statusCode) }
        });

        CRON_JOBS.push({
            id: site.cron_id,
            cron: job,
            siteId: site._id,
            url: site.website
        })
    })
}

