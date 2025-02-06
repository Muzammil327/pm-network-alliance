import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema(
  {
    toolName: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    shortDescription: { type: String, required: true },
    keyFeatures: { type: String, required: true },
    link: { type: String, required: true },
    extraNotes: { type: String },
    source: { type: String },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Tool = mongoose.model("tools", ToolSchema);
export default Tool;