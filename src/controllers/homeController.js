import Home from "../models/Home.js";

// Create/Update Home screen data
export const setHomeData = async (req, res) => {
  try {
    const { announcementText } = req.body;
    const backgroundImage = req.file?.path; // Cloudinary URL

    if (!backgroundImage || !announcementText) {
      return res.status(400).json({ message: "Image and text are required" });
    }

    // Only one record allowed → overwrite if exists
    let home = await Home.findOne();
    if (home) {
      home.backgroundImage = backgroundImage;
      home.announcementText = announcementText;
      await home.save();
    } else {
      home = await Home.create({ backgroundImage, announcementText });
    }

    res.json({ success: true, home });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Home screen data
export const getHomeData = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHomeData = async (req, res) => {
  try {
    const { id } = req.params;
    const { announcementText } = req.body;
    const backgroundImage = req.file?.path;

    const updateFields = {};
    if (announcementText) updateFields.announcementText = announcementText;
    if (backgroundImage) updateFields.backgroundImage = backgroundImage;

    const updated = await Home.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Announcement not found" });
    res.json({ success: true, home: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHomeData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Home.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Announcement not found" });
    res.json({ success: true, message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};