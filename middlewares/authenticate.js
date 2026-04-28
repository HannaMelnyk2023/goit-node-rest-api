import { HttpError } from "../helpers";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const { SECRET_KEY } = process.env;

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        next(HttpError(401, "Not authorized"));
    }
    const [bearer, token] = token.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    } try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401, "Not authorized"));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401, "Not authorized"));

    }
};

export default authenticate;
