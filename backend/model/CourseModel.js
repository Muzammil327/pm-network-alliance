import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    platform: {
      ref: "platforms",
      type: mongoose.Schema.Types.ObjectId,
     },
    categoryFocus: {
      ref: "categories",
      type: mongoose.Schema.Types.ObjectId,
    },
    courseTitle: { type: String, required: true },
    keyPoints: { type: String, required: true },
    link: { type: String, required: true },
    duration: { type: String, default: "N/A" },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Course = mongoose.models["courses"] || mongoose.model("courses", CourseSchema);
export default Course;