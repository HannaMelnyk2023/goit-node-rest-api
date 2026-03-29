import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

export async function listContacts() {
    const readFile = await fs.readFile(contactsPath);
    return JSON.parse(readFile);
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => String(contact.id) === String(contactId)) || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
        (contact) => String(contact.id) === String(contactId),
    );
    if (contactIndex === -1) {
        return null;
    }
    const [removedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

export async function updateContact(contactId, body) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
        (contact) => String(contact.id) === String(contactId),
    );
    if (contactIndex === -1) {
        return null;
    }
    contacts[contactIndex] = { ...contacts[contactIndex], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactIndex];
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};