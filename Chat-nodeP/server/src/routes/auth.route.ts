import express, { Request, Response } from "express";
import { login, register } from "../controller/auth.controller";
import { authMiddleware, logout } from "../middleware/authenticate";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", authMiddleware, (req:Request, res:Response) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;
