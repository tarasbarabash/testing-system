import Quiz from "../../models/Quiz";
import InvalidValueError from "../../errors/InvalidValueError";
import Question from "../../models/Question";

export const getQuizesHandler = (user, page = 0, limit = 10) => {
    return Quiz.getQuizzes(page, limit, user);
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