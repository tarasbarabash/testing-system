import { Router } from "express";
import authRouter from "./auth";
import ApiError from "../../errors/ApiError";
import { noMethod } from "../../static/errorCodes.json";
import quizRouter from "./quiz";
import { requireAuth } from "../../middlewares/auth";

const apiRouter = Router();
apiRouter.use("/auth", authRouter);
apiRouter.use("/quiz", requireAuth, quizRouter);

apiRouter.use((req, res) => {
    throw new ApiError("Not found, check your endpoint and method!", noMethod);
})

export default apiRouter;