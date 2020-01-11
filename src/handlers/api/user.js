import User from "../../models/User";

export const quizzesResults = async (req, res, next) => {
    let { user: { _id: userId }, query: { limit, offset, sort, dir, date, name } } = req;
    limit = limit && parseInt(limit);
    offset = offset && parseInt(offset);
    dir = dir && parseInt(dir);
    date = date && parseInt(date);
    try {
        const chunk = await User.getQuizzesResults({ userId, limit, offset, sort, dir, date, name });
        res.json(chunk);
    } catch (err) {
        next(err);
    }
};