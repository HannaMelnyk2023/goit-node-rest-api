import express from "express";
import {
  getAllContacts,
  getById,
  deleteById,
  addContact,
  updateById,
  updateFavorite,
} from "../controllers/contactsControllers.js";

import { validateBody, authenticate, isValidId } from "../middlewares/index.js";
import { schemas } from "../models/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getById);

contactsRouter.delete("/:id", authenticate, isValidId, deleteById);

contactsRouter.post("/", authenticate, validateBody(schemas.create), addContact);

contactsRouter.put("/:id", authenticate, isValidId, validateBody(schemas.update), updateById);

contactsRouter.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavorite), updateFavorite);

export default contactsRouter;
