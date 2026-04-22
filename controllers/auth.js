const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require('../helpers');

const register = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

const login = async (email, password) => {
    const user
        = await User.findOne({ email, password });
    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }
    return 'token';
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};