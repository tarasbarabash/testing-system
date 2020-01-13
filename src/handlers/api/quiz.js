import Quiz from "../../models/Quiz";
import InvalidValueError from "../../errors/InvalidValueError";
import Question from "../../models/Question";
import User from "../../models/User";
import { Types } from "mongoose";
import ApiError from "../../errors/ApiError";

export const getQuizesHandler = (props) => {
    return Quiz.getQuizzes(props);
}

export const createQuizHandler = async (newQuiz, user) => {
    const { _id } = user;
    try {
        const { questions } = newQuiz;
        if (!questions) throw new InvalidValueError("questions");
        if (questions.length < 3) throw new InvalidValueError("questions");
        const savedQuestions = await Promise.all(questions.map(q => (new Question(q)).save()));
        const quiz = new Quiz({
            ...newQuiz,
            accessibleTo: [1, ...(newQuiz.accessibleTo || [])],
            questions: savedQuestions,
            creator: _id
        });
        const savedQuiz = await quiz.save();
        return { success: true, ...savedQuiz.toObject(), questions: savedQuestions };
    } catch (err) {
        if (err.name === "ValidationError") { throw new InvalidValueError(Object.keys(err.errors).concat(", ")) };
        throw err;
    }
}

export const checkQuizResponses = async (userId, quizId, responses) => {
    const correct = await Quiz.getCorrectOptions(quizId);
    if (correct.length <= 0) throw new ApiError("Invalid quiz id", 404, 404);
    const result = correct.map(i => responses[i.question] == i.correctOption);
    const correctCount = result.reduce((a, b) => a + b, 0);
    const user = await User.addQuizResult(userId, {
        id: new Types.ObjectId(quizId),
        result: correctCount,
        time: new Date().getTime()
    })
    return { correct: correctCount };
}