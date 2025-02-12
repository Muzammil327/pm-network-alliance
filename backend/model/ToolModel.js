import mongoose from "mongoose";

const ToolSchema = new mongoose.Schema(
  {
    toolName: { type: String, required: true },
    category: {
      ref: "categories",
      type: mongoose.Schema.Types.ObjectId,
    },
    subcategory: {
      ref: "subcategories",
      type: mongoose.Schema.Types.ObjectId,
    },
    shortDescription: { type: String, required: true },
    keyFeatures: { type: String, required: true },
    link: { type: String, required: true },
    extraNotes: { type: String },
    source: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

const Tool = mongoose.models["tools"] || mongoose.model("tools", ToolSchema);
export default Tool;
