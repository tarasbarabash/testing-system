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
            req: "Tags"
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
    }]
})

QuizSchema.statics.getQuizzes = function (page = 0, limit = 10, user) {
    limit = parseInt(limit);
    return this.find({ $or: [{ accessibleTo: { $eq: [] } }, { accessibleTo: { $in: [user.role] } }] }).limit(limit).skip(limit * page);
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