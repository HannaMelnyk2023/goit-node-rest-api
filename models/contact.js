import { Schema, model } from "mongoose";
import Joi from "joi";
import handleMongooseError from "../helpers/handleMongooseError.js";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true },
);

contactSchema.post("save", handleMongooseError);

const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});
const updateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
}).min(1);
const schemas = {
    create: createSchema,
    update: updateSchema,
};

const Contact = model("contact", contactSchema);

export { Contact, schemas };
