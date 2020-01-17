import User from "../../models/User";
import ApiError from "../../errors/ApiError";
import bcrypt from "bcryptjs";

export const quizzesResults = async (req, res, next) => {
    let { user: { _id: userId }, query: { limit, offset, sort, dir, date, name, quizId } } = req;
    limit = limit && parseInt(limit);
    offset = offset && parseInt(offset);
    dir = dir && parseInt(dir);
    date = date && parseInt(date);
    try {
        const chunk = await User.getQuizzesResults({ userId, limit, offset, sort, dir, date, name, quizId });
        res.json(chunk);
    } catch (err) {
        next(err);
    }
};

export const changePassword = async (req, res, next) => {
    let { user: { _id: userId }, body: { password, old } } = req;
    try {
        const { password: oldPassword } = req.user;
        if (!old) throw new ApiError("Old password was not provided!");
        if (!password) throw new ApiError("Password was not provided!");
        if (!await bcrypt.compare(old, oldPassword)) throw new ApiError("Passwords don't match!");
        const user = await User.findOneAndUpdate({ _id: userId }, { password }, { new: true });
        res.json({ done: !!user });
    } catch (err) {
        next(err);
    }
}

export const changeName = async (req, res, next) => {
    let { user: { _id: userId }, body: { name } } = req;
    try {
        if (!name) throw new ApiError("Name was not provided!");
        const user = await User.findOneAndUpdate({ _id: userId }, { name }, { new: true, projection: { password: 0, tokens: 0, quizzes: 0 } });
        res.json({ done: !!user, user });
    } catch (err) {
        next(err);
    }
}