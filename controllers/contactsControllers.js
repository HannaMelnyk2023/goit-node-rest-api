import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = (req, res) => {
    contactsService.listContacts().then((contacts) => res.json(contacts));
};

export const getOneContact = (req, res) => {
    const { id } = req.params;
    contactsService.getContactById(id).then((contact) => {
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(contact);
    });
};

export const deleteContact = (req, res) => {
    const { id } = req.params;
    contactsService.removeContact(id).then((contact) => {
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact deleted" });
    });
};

export const createContact = (req, res) => {
    const { name, email, phone } = req.body;
    contactsService.addContact(name, email, phone).then((contact) => {
        res.status(201).json(contact);
    });
};

export const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    contactsService.getContactById(id).then((contact) => {
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        const updatedContact = { ...contact, name, email, phone };
        contactsService
            .removeContact(id)
            .then(() => contactsService.addContact(updatedContact))
            .then(() => res.json(updatedContact));
    });
};
