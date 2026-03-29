import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = (req, res, next) => {
    contactsService
        .listContacts()
        .then((contacts) => res.json(contacts))
        .catch((error) => {
            next(HttpError(500, error.message));
        });
};

export const getOneContact = (req, res, next) => {
    const { id } = req.params;
    contactsService
        .getContactById(id)
        .then((contact) => {
            if (!contact) {
                return res.status(404).json({ message: "Not found" });
            }
            res.json(contact);
        })
        .catch((error) => {
            next(HttpError(500, error.message));
        });
};

export const deleteContact = (req, res, next) => {
    const { id } = req.params;
    contactsService
        .removeContact(id)
        .then((contact) => {
            if (!contact) {
                return res.status(404).json({ message: "Not found" });
            }
            res.json(contact);
        })
        .catch((error) => {
            next(HttpError(500, error.message));
        });
};

export const createContact = (req, res, next) => {
    const { name, email, phone } = req.body;
    contactsService
        .addContact(name, email, phone)
        .then((contact) => {
            res.status(201).json(contact);
        })
        .catch((error) => {
            next(HttpError(500, error.message));
        });
};

export const updateContact = (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    if (Object.keys(body).length === 0) {
        return next(HttpError(400, "Body must have at least one field"));
    }
    contactsService
        .updateContact(id, body)
        .then((contact) => {
            if (!contact) {
                return res.status(404).json({ message: "Not found" });
            }
            res.json(contact);
        })
        .catch((error) => {
            next(HttpError(500, error.message));
        });
};
