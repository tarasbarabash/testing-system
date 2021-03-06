import { Router } from "express";
import { getQuizesHandler, createQuizHandler, checkQuizResponses, quizAttepmt } from "../../handlers/api/quiz";
import { requireEditorialAccess } from "../../middlewares/auth";
import Quiz from "../../models/Quiz";
import ApiError from "../../errors/ApiError";

const quizRouter = Router();

quizRouter.get("/", async (req, res, next) => {
    let { user, query: { limit, offset, sort, dir, name, date, complexity, questionNumb, quizId } } = req;
    limit = limit && parseInt(limit);
    offset = offset && parseInt(offset);
    dir = dir && parseInt(dir);
    date = date && parseInt(date);
    complexity = complexity && parseInt(complexity);
    questionNumb = questionNumb && parseInt(questionNumb);
    try {
        const result = await getQuizesHandler({ user, limit, offset, sort, dir, name, date, complexity, questionNumb, quizId });
        return res.json(result);
    } catch (err) {
        next(err);
    }
})

quizRouter.post("/new", requireEditorialAccess, async (req, res, next) => {
    const quiz = req.body;
    const { user } = req;
    try {
        const result = await createQuizHandler(quiz, user);
        return res.json(result);
    } catch (err) {
        next(err);
    }
})

quizRouter.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    try {
        const result = await Quiz.getQuiz(id, user);
        if (result.length <= 0) throw new ApiError("Quiz not found", 404, 404);
        return res.json(result[0]);
    } catch (err) {
        next(err);
    }
})

quizRouter.post("/:id/check", async (req, res, next) => {
    const { id } = req.params;
    const { user, body: { selectedOptions, prevResultId } } = req;
    try {
        const result = await checkQuizResponses(user._id, id, selectedOptions, prevResultId);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

quizRouter.get("/:id/attempt", async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    try {
        const result = await quizAttepmt(user._id, id);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

export default quizRouter;