import TeamMember from "../models/TeamMember.js";

// ✅ Add member (already created)
export const addTeamMember = async (req, res) => {
  try {
    const { name, designation, category, socials } = req.body;

    if (!req.file) return res.status(400).json({ message: "Image required" });

    const newMember = new TeamMember({
      name,
      designation,
      category,
      image: req.file.path, // Cloudinary URL
      socials: socials ? JSON.parse(socials) : {},
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all members (grouped)
export const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();

    const grouped = members.reduce((acc, member) => {
      if (!acc[member.category]) acc[member.category] = [];
      acc[member.category].push(member);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update member
export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, category, socials } = req.body;

    const updateData = { name, designation, category };

    if (req.file) updateData.image = req.file.path; // new image if uploaded
    if (socials) updateData.socials = JSON.parse(socials);

    const updated = await TeamMember.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Member not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete member
export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TeamMember.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Member not found" });

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
