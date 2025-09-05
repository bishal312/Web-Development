import { Router } from "express";
import { authMiddleware } from "../middleware/authenticate";
import { getStreamToken } from "../controller/chat.controller";

const router = Router();

router.get("/token", authMiddleware, getStreamToken );
// router.post("send-message", authMiddleware, sendMessage);

export default router;