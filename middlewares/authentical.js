import { HttpError } from "../helpers";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
const { SECRET_CODE } = process.env;



const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        next(HttpError(401, "Not authorized"));
    }
    const [bearer, token] = token.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401, "Not authorized"));
    } try {
        const { id } = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(id);
        if (!user) {
            next(HttpError(401, "Not authorized"));
        }
        next();
    } catch (error) {
        next(HttpError(401, "Not authorized"));

    }
};

export default authenticate;
