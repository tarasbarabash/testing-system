import homepageRouter from "./home";
import { Router } from "express";

const router = Router();
router.use(homepageRouter);

export const initRoutes = app => {
    app.use(router);

    app.use((err, req, res, next) => {
        res.status(502).json({
            error: err.message
        })
    })
}