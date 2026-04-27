import { validateBody } from "../helpers/validateBody.js";

import { schemas } from "../models/user.js";
import ctrl from "../controllers/auth.js";

import { Router } from "express";



// singup
router.post("/register", validateBody(schemas.register), ctrl.register);
// singin
router.post("/login", validateBody(schemas.login), ctrl.login);
