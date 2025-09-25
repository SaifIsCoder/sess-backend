import express from "express";
import { saveMessage, getMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", saveMessage);
router.get("/", getMessages);

export default router;
