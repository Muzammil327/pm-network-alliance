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
// app.delete("/api/delete-image", async (req, res) => {
//   try {
//       const { imageUrl } = req.body;
//       console.log("imageUrl:", imageUrl);

//       if (!imageUrl) {
//           return res.status(400).json({ message: "No image URL provided" });
//       }

//       // Extracting public_id correctly
//       const parts = imageUrl.split("/");
//       const filenameWithVersion = parts[parts.length - 1]; // "v1738850006/gqyin1txuznh4r4yrwtm.png"
//       const filename = filenameWithVersion.split(".")[0];  // "gqyin1txuznh4r4yrwtm"

//       console.log("Correct public_id:", filename);

//       // Delete the image from Cloudinary
//       const response = await cloudinary.uploader.destroy(filename);
//       console.log("Cloudinary response:", response);

//       if (response.result !== "ok") {
//           return res.status(400).json({ message: "Failed to delete image" });
//       }

//       res.status(200).json({ message: "Image deleted successfully" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error" });
//   }
// });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
