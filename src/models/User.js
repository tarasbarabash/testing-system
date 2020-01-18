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

UserSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    const keys = Object.keys(update);
    if (keys.indexOf("password") > -1)
        this._update.password = await bcrypt.hash(update.password, 8);
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

UserSchema.statics.updateQuizResult = async function (resultId, correct, time) {
    const user = await this.update({ "quizzes._id": resultId }, {
        $set: { "quizzes.$.result": correct, "quizzes.$.time": time }
    });
    return user;
}

UserSchema.statics.getQuizzesResults = async function ({ userId: id, quizId, limit = 10, offset = 0, sort: sortField = "time", dir = -1, name, date }) {
    const match = {};
    if (name) match["name"] = {
        $regex: new RegExp(`.*${name}.*`, "i")
    };
    if (date) match["time"] = {
        $gte: date,
        $lt: date + 24 * 60 * 60 * 1000
    }
    if (quizId) match["quizId"] = new Types.ObjectId(quizId);
    const pipeline = [
        { $match: { '_id': new Types.ObjectId(id) } },
        { $unwind: { 'path': '$quizzes' } },
        { $sort: { 'quizzes.time': -1 } },
        { $lookup: { 'from': 'quizzes', 'localField': 'quizzes.id', 'foreignField': '_id', 'as': 'quizInfo' } },
        { $unwind: { 'path': '$quizInfo' } },
        { $project: { 'points': '$quizzes.result', 'name': '$quizInfo.name', 'quizId': '$quizzes.id', "questions": { "$size": "$quizInfo.questions" }, "time": "$quizzes.time", "total": "$total" } },
        { $match: match },
        { $sort: { [sortField]: dir } }
    ];
    const quizzes = await this.aggregate(pipeline);
    return { total: quizzes.length, data: quizzes.slice(offset, offset + limit) };
}

export default model("User", UserSchema);