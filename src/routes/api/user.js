import { Router } from "express";
import { latestQuiz, quizzesResults } from "../../handlers/api/user";

const userRouter = Router();

userRouter.get("/latestQuiz", latestQuiz);
userRouter.get("/quizzesResults", quizzesResults);

export default userRouter;