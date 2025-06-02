import { Schema, model } from "mongoose";

/* USER SCHEMA AND MODEL  */
const UserSchema = new Schema({
    email: String,
    name: String
})

export const User = model("user", UserSchema)

