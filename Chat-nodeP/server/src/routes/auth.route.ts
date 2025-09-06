import express, { Request, Response } from "express";
import { login, logout, register } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/authenticate";
import multer from "multer";

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Register with profilePic upload
router.post("/register", upload.single("profilePic"), register);

router.post("/login", login);
router.post("/logout", logout);

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ success: true, user: req.user });
});

export default router;
