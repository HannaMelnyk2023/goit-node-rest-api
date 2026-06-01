import HttpError from "../helpers/HttpError.js"
import { Contact } from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10, favorite } = req.query;
        const skip = (page - 1) * limit;
        const filter = { owner }
        if (favorite !== undefined) {
            filter.favorite = favorite === "true";
        }
        const result = await Contact.find(filter, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOne({ _id: id, owner });
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};
export const updateById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOneAndDelete({ _id: id, owner });
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "Delete success"
        })
    } catch (error) {
        next(error);
    }
};

export const addContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}
