import { Router } from "express";
import { userFeedback } from "../../handlers/api/feedback";

const feedbackRouter = Router();
feedbackRouter.post("/new", userFeedback);
export default feedbackRouter;