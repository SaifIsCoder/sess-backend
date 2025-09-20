import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    category: {
      type: String,
      enum: ["Leadership", "CodeCrafters", "Marketing PR & Media Wing"],
      required: true,
    },
    socials: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("TeamMember", teamMemberSchema);
