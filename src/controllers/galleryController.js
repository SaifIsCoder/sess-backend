import Gallery from "../models/Gallery.js";

// Upload Images
export const uploadImages = async (req, res) => {
  try {
    const { title } = req.body;
    // if (!title) return res.status(400).json({ message: "Title required" });

    const images = req.files.map((file) => ({ url: file.path }));

    const gallery = new Gallery({ title, images, videos: [] });
    await gallery.save();

    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload Videos
export const uploadVideos = async (req, res) => {
  try {
    const { title } = req.body;
    // if (!title) return res.status(400).json({ message: "Title required" });

    const videos = req.files.map((file) => ({ url: file.path }));

    const gallery = new Gallery({ title, images: [], videos });
    await gallery.save();

    res.status(201).json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Galleries
export const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json(galleries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Only Images
export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find({ "images.0": { $exists: true } });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Only Videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Gallery.find({ "videos.0": { $exists: true } });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
