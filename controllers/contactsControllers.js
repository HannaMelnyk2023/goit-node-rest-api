import contactsService from "../services/contactsServices.js";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js"

export const getAllContacts = (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await User.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
    res.json(result);
};

export const getById = (req, res) => {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
};
export const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

export const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

export const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await User.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}

export const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await User.create({ ...req.body, owner });
    res.status(201).json(result);
}
