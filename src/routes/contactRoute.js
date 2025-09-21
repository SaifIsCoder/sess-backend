import express from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact message
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(400).json({
      success: false,
      message: err.message || "Failed to send message",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch messages",
    });
  }
});

export default router;
