import { model, Schema } from "mongoose";

const QuestionSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    options: [{
        value: String,
        correct: Boolean
    }]
});

export default model("Question", QuestionSchema);