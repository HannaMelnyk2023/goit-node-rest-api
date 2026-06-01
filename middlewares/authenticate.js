import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return next(HttpError(401, "Not authorized"));
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer") {
        return next(HttpError(401, "Not authorized"));
    } try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            return next(HttpError(401, "Not authorized"));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(HttpError(401, "Not authorized"));

    }
};

export default authenticate;
