import { validateBody } from "../middlewares/index.js";

import { schemas } from "../models/user.js";
import * as ctrl from "../controllers/auth.js";

import { Router } from "express";
import { authenticate } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = Router();

// singup
router.post("/register", validateBody(schemas.register), ctrl.register);
// singin
router.post("/login", validateBody(schemas.login), ctrl.login);
// current
router.get("/current", authenticate, ctrl.getCurrent);
// log-out
router.post("/logout", authenticate, ctrl.logout);
// avatar
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);
// verify email
router.get("/verify/:verificationToken", ctrl.verifyEmail);
// resend verify email
router.post("/verify", validateBody(schemas.email), ctrl.resendVerifyEmail);

export default router;