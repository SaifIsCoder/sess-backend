import express from "express";
import upload from "../middlewares/upload.js";
import { setHomeData, getHomeData } from "../controllers/homeController.js";

const router = express.Router();

// Upload bg image + text
router.post("/", upload.single("backgroundImage"), setHomeData);

// Fetch home data
router.get("/", getHomeData);

export default router;
