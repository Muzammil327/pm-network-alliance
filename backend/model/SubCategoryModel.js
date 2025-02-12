import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const SubCategory = mongoose.models["subcategories"] || mongoose.model("subcategories", SubCategorySchema);
export default SubCategory;