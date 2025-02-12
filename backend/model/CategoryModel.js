import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.models["categories"] || mongoose.model("categories", CategorySchema);
export default Category;
