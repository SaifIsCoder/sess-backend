import upload from "../middlewares/upload.js";
import express from "express";
import {
  uploadImages,
  uploadVideos,
  getAllGalleries,
  getImages,
  getVideos,
} from "../controllers/galleryController.js";

const router = express.Router();

// Upload
router.post("/images", upload.array("images", 10), uploadImages);
router.post("/videos", upload.array("videos", 5), uploadVideos);

// Fetch
router.get("/", getAllGalleries);
router.get("/images", getImages);
router.get("/videos", getVideos);

export default router;
