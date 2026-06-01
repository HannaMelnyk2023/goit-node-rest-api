import { User } from "../models/user.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Jimp from "jimp";


const { SECRET_KEY } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const avatarsDir = path.join(__dirname, "../", "public", "avatars");


const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw HttpError(409, "Email in use");
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
        const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            }
        });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("SECRET_KEY", SECRET_KEY);
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is invalid");
        }
        const payload = {
            id: user._id,
        };

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw HttpError(401, "Email or password is invalid");
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({
            token, user: {
                email: user.email,
                subscription: user.subscription,
            }
        });
    } catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        res.json({
            email,
            subscription
        })
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
const updateAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            throw HttpError(400, "Avatar file is required");
        }
        const { path: tempPath, originalname } = req.file;
        const { _id } = req.user;
        const filename = `${_id}_${originalname}`;
        const resultPath = path.join(avatarsDir, filename);

        const image = await Jimp.read(tempPath);
        await image.resize(250, 250).writeAsync(resultPath);

        await fs.unlink(tempPath);

        const avatarURL = `/avatars/${filename}`;
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        next(error);
    }
};

export {
    register,
    login,
    getCurrent,
    logout,
    updateAvatar
}
