const { Shema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

// регулярное выражение для проверки формата email - ДЕ ВЗЯТИ!!
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Shema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegexp,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },


}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
};

const User = model("user", userSchema);
module.exports = { User, schemas };
