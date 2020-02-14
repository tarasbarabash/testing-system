import express, { Router } from "express";
import path from "path";
import apiRouter from "./api";
import ApiError from "../errors/ApiError";

const router = Router();
router.use("/api", apiRouter);
router.use(express.static(path.join(__dirname, "../../../front/build")));
router.all("*", (req, res) => res.sendFile(path.join(__dirname, "../../../front/build/index.html")));

export const initRoutes = app => {
    app.use(router);

    app.use((err, req, res, next) => {
        if (err instanceof ApiError)
            res.status(err.responseCode || 400).json({
                error: err.message,
                code: err.code
            });
        else {
            console.error(err);
            res.status(200).json({
                error: "Something went wrong",
            });
        }
    })
}