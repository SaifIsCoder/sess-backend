import express from "express";
import upload from "../middlewares/upload.js";
import {
  addTeamMember,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamController.js";

const router = express.Router();

// Create
router.post("/", upload.single("image"), addTeamMember);

// Read
router.get("/", getTeamMembers);

// Update
router.put("/:id", upload.single("image"), updateTeamMember);

// Delete
router.delete("/:id", deleteTeamMember);

export default router;
