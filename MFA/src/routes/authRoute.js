import { Router } from "express";
import passport from "passport";
import {
  authStatus,
  login,
  logout,
  register,
  reset2FA,
  setup2FA,
  verify2FA,
} from "../controllers/authController.js";
import { success } from "zod";
import { secAuth } from "../middleware/secondaryAuth.js";

const router = Router();

//Registration Route
router.post("/register", register);
//Login Route
router.post("/login", passport.authenticate("local"), login);
//Auth Status Route
router.get("/status", authStatus);
//Logout Route
router.post("/logout", logout);

//2FA setup
router.post("/2fa/setup", secAuth, setup2FA);
//verify 2FA
router.post("/2fa/verify",secAuth, verify2FA);
//reset 2FA
router.post("/2fa/reset", secAuth, reset2FA);

export default router;
