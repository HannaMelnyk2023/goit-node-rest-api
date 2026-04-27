import { validateBody } from "../helpers/validateBody.js";

import { schemas } from "../models/user.js";
import ctrl from "../controllers/auth.js";

import { Router } from "express";
import { authenticate } from "../middlewares/index.js";



// singup
router.post("/register", validateBody(schemas.register), register);
// singin
router.post("/login", validateBody(schemas.login), login);
// current
router.get("/current", "authenticate", getCurrent);
// log-out
router.post("/logout", "authenticate", logout);