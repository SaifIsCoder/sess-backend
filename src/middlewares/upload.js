import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Dynamic storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    // By default go to "general"
    let folder = "general";

    // Option 1: Get folder from request query (?folder=events)
    if (req.query.folder) {
      folder = req.query.folder;
    }
    return {
      folder,
      resource_type: file.mimetype.startsWith("video") ? "video" : "image",
    };
  },
});

const upload = multer({ storage });
export default upload;
