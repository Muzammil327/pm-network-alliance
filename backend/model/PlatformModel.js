import mongoose from "mongoose";

const PlatformSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

const Platform = mongoose.models["platforms"] || mongoose.model("platforms", PlatformSchema);
export default Platform;