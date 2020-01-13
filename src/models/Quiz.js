import { model, Schema, Types } from "mongoose";
import ApiError from "../errors/ApiError";
import { minQuestionsError } from "../static/errorCodes.json";
import InvalidValueError from "../errors/InvalidValueError";

const QuizSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    creator: {
        required: true,
        type: Schema.Types.ObjectId
    },
    tags: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Tags"
        }]
    },
    complexity: {
        type: Number,
        required: true,
        validate: (value) => {
            if (value <= 0 || value > 5) throw new InvalidValueError("complexity");
        }
    },
    questions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Questions"
        }],
        validate: (value) => {
            if (value.length < 3) throw new ApiError("A new quiz should have at least 3 questions!", minQuestionsError);
        }
    },
    canEdit: [{
        type: Number
    }],
    accessibleTo: [{
        type: Number
    }],
    timer: Number
})

QuizSchema.statics.getQuizzes = async function ({ user: { role }, limit = 10, offset = 0, sort: sortField = "complexity", dir = -1, name, date, complexity, questionNumb }) {
    const match = {};
    if (name) match.name = { $regex: new RegExp(`.*${name}.*`, "i") };
    if (complexity) match.complexity = complexity;
    if (questionNumb) match.questions = questionNumb;
    const pipeline = [
        { $match: { 'accessibleTo': { $in: [[], role] } } },
        { $lookup: { 'from': 'users', 'localField': 'creator', 'foreignField': '_id', 'as': 'creatorInfo' } },
        { $unwind: { 'path': '$creatorInfo' } },
        { $project: { 'questions': { $size: "$questions" }, 'name': 1, 'complexity': 1, 'creator': { '_id': '$creator', 'name': '$creatorInfo.name', 'mail': '$creatorInfo.mail' }, 'tags': 1 } },
        { $match: match },
        { $sort: { [sortField]: dir } }
    ];
    const result = await this.aggregate(pipeline);
    let withTime = result.map(i => ({ time: new Types.ObjectId(i._id).generationTime * 1000, ...i }));
    if (date) withTime = withTime.filter(i => i.time < date + 24 * 60 * 60 * 1000 && i.time > date);
    if (sortField === "time") withTime.sort((a, b) => dir === -1 ? b.time - a.time : a.time - b.time);
    return { total: withTime.length, data: withTime.splice(offset, offset + limit) }
}

QuizSchema.statics.getCorrectOptions = function (id) {
    return this.aggregate([
        { $match: { '_id': new Types.ObjectId(id) } },
        { $unwind: { 'path': '$questions' } },
        { $lookup: { 'from': 'questions', 'localField': 'questions', 'foreignField': '_id', 'as': 'questions' } },
        { $unwind: { 'path': '$questions' } },
        { $unwind: { 'path': '$questions.options' } },
        { $match: { 'questions.options.correct': true } },
        { $project: { '_id': 0, 'question': '$questions._id', 'correctOption': '$questions.options._id' } }
    ])
}

QuizSchema.statics.getQuiz = function (id, user) {
    return this.aggregate([
        { $match: { $or: [{ accessibleTo: { $eq: [] } }, { accessibleTo: { $in: [user.role] } }], _id: new Types.ObjectId(id) } },
        { $lookup: { from: "questions", localField: "questions", foreignField: "_id", as: "questions" } },
        { $lookup: { from: "users", localField: "creator", foreignField: "_id", as: "creator" } },
        { $unwind: { path: "$creator" } },
        { $project: { "creator.password": 0, "creator.tokens": 0 } }
    ])
}

export default model("Quiz", QuizSchema);