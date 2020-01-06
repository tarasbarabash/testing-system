import User from "../../models/User";

export const latestQuiz = async (req, res, next) => {
    const { user: { _id: userId } } = req;
    try {
        const [lastQuiz] = await User.getQuizzesResults(userId);
        res.json(lastQuiz);
    } catch (err) {
        next(err);
    }
};

export const quizzesResults = async (req, res, next) => {
    const { user: { _id: userId } } = req;
    try {
        const all = await User.getQuizzesResults(userId);
        res.json(all);
    } catch (err) {
        next(err);
    }
};