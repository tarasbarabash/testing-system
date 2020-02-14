import { Schema, model } from "mongoose";

const UserRoleSchema = new Schema({
    userGroupName: String,
    roleCode: {
        type: Number,
        unique: true
    }
});

export default model("UserRole", UserRoleSchema);