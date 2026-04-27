import { User } from "../models/user";
import { HttpError } from "../helpers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    if (!user) {
        throw HttpError(401, "Email or password is invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is invalid");
    }

    res.json({
        token: user.token,
        name: user.name,
        email: user.email,
    });
};

const getCurrent = async (req, res) => {
    const { email, name } = req.user;
    res.json({
        email,
        name
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.json({ message: "Logout successful" });
}

export { register, login, getCurrent, logout };
