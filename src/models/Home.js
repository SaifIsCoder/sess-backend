import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    backgroundImage: {
      type: String, // Cloudinary URL
      required: true,
    },
    announcementText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Home = mongoose.model("Home", homeSchema);
export default Home;
