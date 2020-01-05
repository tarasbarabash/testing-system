import { Router } from "express";
import { loginHandler, signupHandler, logoutHandler, endAllSessionsHandler, validateToken } from "../../handlers/api/auth";
import { requireAuth } from "../../middlewares/auth";

const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/signup", signupHandler);
authRouter.get("/logout", requireAuth, logoutHandler);
authRouter.get("/endAllSessions", requireAuth, endAllSessionsHandler);
authRouter.get("/validateToken", requireAuth, validateToken);

export default authRouter;