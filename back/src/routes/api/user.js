import { Router } from "express";
import { quizzesResults, changePassword, changeName } from "../../handlers/api/user";

const userRouter = Router();
userRouter.get("/quizzesResults", quizzesResults);
userRouter.post("/update/password", changePassword);
userRouter.post("/update/name", changeName);

export default userRouter;