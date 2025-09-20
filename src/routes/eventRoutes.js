import express from "express";
import upload from "../middlewares/upload.js";
import { createEvent, getEvents, deleteEvent, getLatestEvents  } from "../controllers/eventController.js";

const router = express.Router();

// Create event
router.post("/", upload.single("image"), createEvent);

// Get events (past & upcoming)
router.get("/", getEvents);

// Delete event
router.delete("/:id", deleteEvent);

// Get latest past & upcoming
router.get("/latest", getLatestEvents);

export default router;
