import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dgxgwj73h",
  api_key: process.env.CLOUDINARY_API_KEY || 996935177455498,
  api_secret: process.env.CLOUDINARY_API_SECRET || "y2tdjGmMXzRUEfk5crFDZ7OptA4",
});

export default cloudinary;
