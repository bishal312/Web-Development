import express from "express";
import { authMiddleware } from "../middleware/authenticate";
import { getAllUsers } from "../controller/user.controller";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllUsers);

export default router;