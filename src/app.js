import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import homeRoutes from "./routes/homeRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Limit to 5 requests per minute for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, 
  message: "Too many contact requests from this IP, please try again later",
});

// Routes
app.use("/api/home", homeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/contact", contactLimiter, contactRoute);


const PORT = process.env.PORT || 5000;

// connect DB & start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
