import { model, Schema } from "mongoose";
import ApiError from "../errors/ApiError";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import InvalidValueError from "../errors/InvalidValueError";
import { mailNotFound, passMailNotFound } from "../static/errorCodes.json";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) throw new InvalidValueError("mail");
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    created: Number,
    tokens: [{
        type: String
    }]
});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8);
    if (user.isNew)
        user.created = new Date().getTime();
    next();
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
    if (user.tokens.length > 10) user.tokens.splice(0, 10, token);
    else user.tokens = user.tokens.concat(token);
    await user.save();
    return token;
}

UserSchema.statics.login = async function (mail, pass) {
    const user = await this.findOne({ mail });
    if (!user) throw new ApiError("No user found with a provided email!", mailNotFound);
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) throw new ApiError("No matches found! Double check the password and e-mail", passMailNotFound);
    return user;
}

export default model("User", UserSchema);