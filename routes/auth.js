import { validateBody } from "../middlewares/index.js";

import { schemas } from "../models/user.js";
import ctrl from "../controllers/auth.js";

import { Router } from "express";
import { authenticate } from "../middlewares/index.js";

const router = Router();

// singup
router.post("/register", validateBody(schemas.register), ctrl.register);
// singin
router.post("/login", validateBody(schemas.login), ctrl.login);
// current
router.get("/current", authenticate, ctrl.getCurrent);
// log-out
router.post("/logout", authenticate, ctrl.logout);

export default router;