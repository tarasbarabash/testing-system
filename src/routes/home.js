import { Router } from "express";

const homepageRouter = Router();

homepageRouter.get("/", (req, res) => {
    res.json({ hello: "world" });
})

export default homepageRouter;