import { Router } from "express";
import { quizzesResults } from "../../handlers/api/user";

const userRouter = Router();
userRouter.get("/quizzesResults", quizzesResults);

export default userRouter;