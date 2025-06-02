import { model, Schema } from "mongoose"

/* SITE SCHEMA AND MODEL  */
const DowntimeSchema = new Schema({
    from: Date,
    to: Date,
    statusCode: Number,
    siteId: {
        type: Schema.Types.ObjectId,
        ref: "site"
    },
    message: String
})

export const Downtime = model("downtime", DowntimeSchema)