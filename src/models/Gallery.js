import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    //   required: true,
    },
    images: [
      {
        url: { type: String, required: true },
      },
    ],
    videos: [
      {
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
