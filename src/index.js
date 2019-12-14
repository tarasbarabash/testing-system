import "dotenv/config";
import express from "express";
import { initMiddleware, startApp, initDB } from "./config";
import { initRoutes } from "./routes";

const app = express();

initDB();
initMiddleware(app);
initRoutes(app);
startApp(app);

export default app;