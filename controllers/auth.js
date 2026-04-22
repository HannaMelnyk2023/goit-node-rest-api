import { User } from "../models/user";
import { HttpError, ctrlWrapper } from "../helpers";


const register = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    });
};

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//         throw HttpError(401, "Email or password is wrong");
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//         throw HttpError(401, "Email or password is wrong");
//     }

//     res.json({
//         token: user.generateToken(),
//         name: user.name,
//         email: user.email,
//     });
// };

export { register: ctrlWrapper(register),
    // login: ctrlWrapper(login) 
};  