import { model, Schema, Types } from "mongoose";
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
    }],
    quizzes: [{
        id: Schema.Types.ObjectId,
        result: Number,
        time: Number
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

UserSchema.statics.addQuizResult = async function (id, quiz) {
    const user = await this.findOne({ _id: id });
    if (!user) throw new ApiError("No user found with a provided it");
    (user.quizzes || []).push(quiz);
    return user.save();
}

UserSchema.statics.getQuizzesResults = async function (id) {
    const quizzes = await this.aggregate([
        { $match: { '_id': new Types.ObjectId(id) } },
        { $unwind: { 'path': '$quizzes' } },
        { $sort: { 'quizzes.time': -1 } },
        { $lookup: { 'from': 'quizzes', 'localField': 'quizzes.id', 'foreignField': '_id', 'as': 'quizInfo' } },
        { $unwind: { 'path': '$quizInfo' } },
        { $project: { 'points': '$quizzes.result', 'name': '$quizInfo.name', 'quizId': '$quizzes.id', "questions": { "$size": "$quizInfo.questions" }, "time": "$quizzes.time" } }
    ]);
    return quizzes;
}

export default model("User", UserSchema);