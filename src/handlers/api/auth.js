import User from "../../models/User";
import validator from "validator";
import InvalidValueError from "../../errors/InvalidValueError";
import ApiError from "../../errors/ApiError";
import { nonuniqueMail } from "../../static/errorCodes.json";

export const loginHandler = async (req, res, next) => {
    try {
        const { mail, password: pass } = req.body;
        if (!validator.isEmail(mail)) throw new InvalidValueError("mail");
        if (!pass) throw new InvalidValueError("password");
        const user = await User.login(mail, pass);
        const token = await user.generateAuthToken();
        const { name, role, created } = user;
        return res.json({ name, mail, role, created, token });
    } catch (err) {
        next(err);
    }
}

export const signupHandler = async (req, res, next) => {
    const { name, mail, password, role } = req.body;
    try {
        if (!name) throw new InvalidValueError("name");
        if (!validator.isEmail(mail)) throw new InvalidValueError("mail");
        if (!password) throw new InvalidValueError("password");
        if (!role) throw new InvalidValueError("role");
        const user = new User({
            name, mail, password, role
        });
        await user.save();
        const token = await user.generateAuthToken();
        const { created } = user;
        return res.status(200).json({ name, mail, role, created, token });
    } catch (err) {
        if (err.name === "MongoError" && err.code === 11000)
            return next(new ApiError(`User with ${mail} is already registred!`, nonuniqueMail));
        return next(err);
    }
}

export const logoutHandler = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => req.token !== token);
        await req.user.save();
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
}

export const endAllSessionsHandler = async (req, res, next) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
}