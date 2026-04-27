import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

import { validateBody, authenticate, isValidId } from "../middlewares/index.js";
import { schemas } from "../models/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);

contactsRouter.post("/", authenticate, validateBody(schemas.create), createContact);

contactsRouter.put("/:id", authenticate, isValidId, validateBody(schemas.update), updateContact);

export default contactsRouter;
