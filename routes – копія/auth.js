const ctrl = require("../controllers/auth.js");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await authService.login(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;