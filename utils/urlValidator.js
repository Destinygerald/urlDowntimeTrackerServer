import axios from "axios"

export async function validateUrlAccessibility (url) {
    try {
        const response = await axios.head(url);

        const statusCode = response.status;

        const isAccessible = statusCode >= 200 && statusCode < 400;

        return { statusCode, isAccessible }
    } catch (err) {
        return { statusCode: 0, isAccessible: false }
    }
}

export function parseUrl (url) {
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
        url = "https://" + url;
    }

    return url;
}

export function getStatus (statusCode) {
    return statusCode >= 200 && statusCode < 300 ? "up" : "down"
}