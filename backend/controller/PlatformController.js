import Platform from "../model/PlatformModel.js";

const CreatePlatform = async (req, res) => {
  try {
    console.log("req.body:", req.body)
    const { name } = req.body;
    const newPlatform = new Platform({ name });
    await newPlatform.save();
    res.status(201).json(newPlatform);
  } catch (error) {
    console.error("Error creating platform", error);
  }
};
const GetPlatform = async (req, res) => {
  try {
    const platform = await Platform.find().sort({ name: 1 });
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });
    res.json(platform);
  } catch (error) {
    console.error("Error getting platform:", error);
  }
};
const GetSinglePlatform = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });
    res.json(platform);
  } catch (error) {
    console.error("Error getting platform:", error);
  }
};
const DeletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });
    res.json({ message: "Platform deleted successfully" });
  } catch (error) {
    console.error("Error deleting platform:", error);
  }
};
const UpdatePlatform = async (req, res) => {
  const { name } = req.body;
  try {
    const platform = await Platform.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true }
    );
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });
    res.json(platform);
  } catch (error) {
    console.error("Error updating platform:", error);
  }
};

export { CreatePlatform, GetPlatform, DeletePlatform, UpdatePlatform, GetSinglePlatform };
