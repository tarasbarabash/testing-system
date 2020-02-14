import jwt from "jsonwebtoken";
import User from "../models/User";
import ApiError from "../errors/ApiError";
import { sessionExpired } from "../static/errorCodes.json";

export const requireAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return next(new ApiError("No authorization header!"));
    const token = authHeader.replace("Bearer ", "");
    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({ _id: data._id, tokens: token });
        if (!user) throw new ApiError("Session expired! Please login again!", sessionExpired, 401);
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") return next(new ApiError("Mailformed jwt token!"));
        next(err);
    }
}

export const requireEditorialAccess = async (req, res, next) => {
    if (req.user.role < 3) return next();
    else next(new ApiError("Forbidden!", 403, 403));
}