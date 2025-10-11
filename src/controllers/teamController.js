// import TeamMember from "../models/TeamMember.js";

// // ✅ Add member
// export const addTeamMember = async (req, res) => {
//   try {
//     const { name, designation, category, socials } = req.body;

//     // --- 1. Validation ---
//     if (!name || !designation || !category) {
//       return res.status(400).json({ message: "Name, designation, and category are required." });
//     }
//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required." });
//     }

//     // --- 2. Safe JSON Parsing ---
//     let parsedSocials = {};
//     if (socials) {
//       try {
//         parsedSocials = JSON.parse(socials);
//       } catch (parseError) {
//         return res.status(400).json({ message: "Invalid format for socials. Must be a valid JSON string." });
//       }
//     }

//     const newMember = new TeamMember({
//       name,
//       designation,
//       category,
//       image: req.file.path,
//       socials: parsedSocials,
//     });

//     await newMember.save();
//     res.status(201).json(newMember);
//   } catch (err) {
//     // --- 3. Better Error Handling ---
//     console.error("ADD TEAM MEMBER ERROR:", err);
//     res.status(500).json({ message: "An unexpected error occurred on the server." });
//   }
// };

// // ✅ Get all members (grouped efficiently)
// export const getTeamMembers = async (req, res) => {
//   try {
//     // --- 4. Optimized with MongoDB Aggregation ---
//     const groupedMembers = await TeamMember.aggregate([
//       { $group: { _id: "$category", members: { $push: "$$ROOT" } } },
//       { $group: { _id: null, categories: { $push: { k: "$_id", v: "$members" } } } },
//       { $replaceRoot: { newRoot: { $arrayToObject: "$categories" } } },
//     ]);

//     const result = groupedMembers.length > 0 ? groupedMembers[0] : {};
//     res.json(result);
//   } catch (err) {
//     console.error("GET TEAM MEMBERS ERROR:", err);
//     res.status(500).json({ message: "An unexpected error occurred on the server." });
//   }
// };

// // ✅ Update member
// export const updateTeamMember = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, designation, category, socials } = req.body;

//     const updateData = { name, designation, category };

//     if (req.file) updateData.image = req.file.path;

//     if (socials) {
//       try {
//         updateData.socials = JSON.parse(socials);
//       } catch (parseError) {
//         return res.status(400).json({ message: "Invalid format for socials. Must be a valid JSON string." });
//       }
//     }

//     const updatedMember = await TeamMember.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedMember) {
//       return res.status(404).json({ message: "Member not found." });
//     }

//     res.json(updatedMember);
//   } catch (err) {
//     console.error("UPDATE TEAM MEMBER ERROR:", err);
//     res.status(500).json({ message: "An unexpected error occurred on the server." });
//   }
// };

// // ✅ Delete member
// export const deleteTeamMember = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedMember = await TeamMember.findByIdAndDelete(id);

//     if (!deletedMember) {
//       return res.status(404).json({ message: "Member not found." });
//     }

//     res.json({ message: "Member deleted successfully." });
//   } catch (err) {
//     console.error("DELETE TEAM MEMBER ERROR:", err);
//     res.status(500).json({ message: "An unexpected error occurred on the server." });
//   }
// };

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
