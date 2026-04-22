import { validateBody } from "../middlewares/validation.js";
//де взяти мідллваре для валідації?
import { schemas } from "../models/user.js";
import ctrl from "../controllers/auth.js";


router.post("/register", validateBody(schemas.register), ctrl.register);

router.post("/login", validateBody(schemas.login), ctrl.login);
