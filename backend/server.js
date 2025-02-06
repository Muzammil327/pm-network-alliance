import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoute.js";
import courseRoutes from "./routes/CourseRoute.js";
import toolRoutes from "./routes/ToolRoute.js";
import connectDB from "./util/dbConn.js";
import cloudinary from "./util/cloudinary.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/tools", toolRoutes);

// Delete image of cloudinary
app.delete("/api/delete-image", async (req, res) => {
    try {
      const { imageUrl } = req.body;
      if (!imageUrl) {
        return res.status(400).json({ message: "No image URL provided" });
      }
  
      // Extract public_id from the image URL
      const regex = /\/v[0-9]+\/(.*?)\./;
      const match = imageUrl.match(regex);
      if (!match || !match[1]) {
        return res.status(400).json({ message: "Invalid image URL" });
      }
  
      const public_id = match[1];
  
      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(public_id);
  
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
