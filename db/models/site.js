import { model, Schema } from "mongoose"

/* SITE SCHEMA AND MODEL  */
const SiteSchema = new Schema({
    website: String,
    date_added: Date,
    cron_duration: String,
    cron_id: String,
    running: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    pause: {
        type: Boolean,
        default: false
    }
})

export const Site = model("site", SiteSchema)
