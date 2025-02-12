import Category from "../model/CategoryModel.js";

const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
  }
};
const GetCategory = async (req, res) => {
  try {
    const category = await Category.find().sort({ name: 1 });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error("Error getting category:", error);
  }
};
const GetSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error("Error getting category:", error);
  }
};
const DeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
const UpdateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      { new: true }
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

export {
  CreateCategory,
  GetCategory,
  DeleteCategory,
  UpdateCategory,
  GetSingleCategory,
};
