import SubCategory from "../model/SubCategoryModel.js";

const CreateSubCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newSubCategory = new SubCategory({ name });
    await newSubCategory.save();
    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error("Error creating sub category:", error);
  }
};
const GetSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.find().sort({ name: 1 });
    if (!subCategory)
      return res.status(404).json({ message: "SubCategory not found" });
    res.json(subCategory);
  } catch (error) {
    console.error("Error getting sub category:", error);
  }
};
const GetSingleSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory)
      return res.status(404).json({ message: "SubCategory not found" });
    res.json(subCategory);
  } catch (error) {
    console.error("Error getting subCategory:", error);
  }
};
const DeleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory)
      return res.status(404).json({ message: "SubCategory not found" });
    res.json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting sub category:", error);
  }
};
const UpdateSubCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true }
    );
    if (!subCategory)
      return res.status(404).json({ message: "SubCategory not found" });
    res.json(subCategory);
  } catch (error) {
    console.error("Error updating sub category:", error);
  }
};

export {
  CreateSubCategory,
  GetSubCategory,
  DeleteSubCategory,
  UpdateSubCategory,
  GetSingleSubCategory,
};
