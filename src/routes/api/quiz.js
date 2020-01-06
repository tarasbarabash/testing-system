import { Router } from "express";
import { getQuizesHandler, createQuizHandler, checkQuizResponses } from "../../handlers/api/quiz";
import { requireEditorialAccess } from "../../middlewares/auth";
import Quiz from "../../models/Quiz";
import ApiError from "../../errors/ApiError";

const quizRouter = Router();

quizRouter.get("/", async (req, res, next) => {
    const { page, limit } = req.query;
    try {
        const result = await getQuizesHandler(req.user, page, limit);
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
    const { user, body: selectedOptions } = req;
    try {
        const result = await checkQuizResponses(user._id, id, selectedOptions);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default quizRouter;