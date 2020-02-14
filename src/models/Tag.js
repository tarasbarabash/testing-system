import { Schema, model } from "mongoose";

const TagSchema = new Schema({
    title: String,
});

export default model("Tag", TagSchema);