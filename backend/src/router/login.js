import express from "express";
import login from "../controller/auth/login.js";
import logout from "../controller/auth/logout.js";
const router = express.Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);
router.post("/logout", logout);
export default router;