import { User } from "../models/user.js";
import { Site } from "../models/site.js";

export async function addUser (email, name) {
    return await User.create({ email, name });
}


export async function getUser(email) {
    return await User.findOne({ email: email })
}

export async function getUserSites (email) {
    const user = await User.findOne({ email: email });
    if (!user) return [];
    return await Site.find({ userId: user?._id })
}

