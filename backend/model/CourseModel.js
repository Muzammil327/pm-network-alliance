import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    categoryFocus: { type: String, required: true },
    courseTitle: { type: String, required: true },
    keyPoints: { type: String, required: true },
    link: { type: String, required: true },
    duration: { type: String, default: "N/A" },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("courses", CourseSchema);
export default Course;
