import { Router } from "express";
import { signup, login, update } from "../controllers/authController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.put("/update", authMiddleware, update);

export default router;
