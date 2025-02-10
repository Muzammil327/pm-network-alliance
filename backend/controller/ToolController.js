import Tool from "../model/ToolModel.js";
import cloudinary from "../util/cloudinary.js";
import formidable from "formidable";

const CreateTool = async (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(400).send("Error parsing the form.");
    }

    try {
      const toolName = fields.toolName[0];
      const category = fields.category[0];
      const subcategory = fields.subcategory[0];
      const link = fields.link[0];
      const shortDescription = fields.shortDescription[0];
      const keyFeatures = fields.keyFeatures[0];
      const extraNotes = fields.extraNotes[0];

      let image;
      if (files.image) {
        const uploadResponse = await cloudinary.uploader.upload(
          files.image[0].filepath,
          {
            folder: "courses/images",
          }
        );
        image = uploadResponse.secure_url;
      } else {
        image = "";
      }

      const newTool = new Tool({
        toolName,
        category,
        subcategory,
        shortDescription,
        link,
        keyFeatures,
        extraNotes,
        imageUrl: image, // Cloudinary URL
      });

      await newTool.save();
      res.status(201).json(newTool);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

const GetTool = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 6; // Default to limit of 6
    const subcatgeory = req.query.subcatgeory?.trim();
    const category = req.query.category?.trim();
    const searchTerm = req.query.searchTerm;

    const skip = (page - 1) * limit;

    let filter = {}; // Default: No filter

    if (category) {
      filter.category = category;
    }
    if (subcatgeory) {
      filter.subcategory = subcatgeory;
    }
    if (searchTerm) {
      filter.$or = [
        { toolName: { $regex: searchTerm, $options: "i" } },
        { keyFeatures: { $regex: searchTerm, $options: "i" } },
        { shortDescription: { $regex: searchTerm, $options: "i" } },
      ];
    }

    const tools = await Tool.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalTools = await Tool.countDocuments(filter);
    const totalPages = Math.ceil(totalTools / limit);

    res.json({
      tools,
      currentPage: page,
      totalPages,
      totalTools,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const SingleTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }
    res.json(tool);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const UpdateTool = async (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(400).send("Error parsing the form.");
    }

    try {
      const toolName = fields.toolName?.[0];
      const category = fields.category?.[0];
      const subcategory = fields.subcategory?.[0];
      const link = fields.link?.[0];
      const shortDescription = fields.shortDescription?.[0];
      const keyFeatures = fields.keyFeatures?.[0];
      const extraNotes = fields.extraNotes?.[0];
      let image;

      if (fields) {
        image = files.image?.[0];
      } else {
        image = "";
      }

      // Check if the tool exists
      const tool = await Tool.findById(req.params.id);
    
      if (!tool) {
        return res.status(404).json({ message: "Tool not found" });
      }

      // If a new image is provided, upload it to Cloudinary
      let imageUrl;
      
      if (files?.image?.[0]) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(
            files.image[0].filepath,
            {
              folder: "tools/images",
            }
          );
          imageUrl = uploadResponse.secure_url;
        } catch (error) {
          console.error("Cloudinary upload failed:", error);
        }
      } else {
        imageUrl = ""; // Or any default value if needed
      }

      // Update the tool with new data
      tool.toolName = toolName || tool.toolName;
      tool.category = category || tool.category;
      tool.subcategory = subcategory || tool.subcategory;
      tool.link = link || tool.link;
      tool.shortDescription = shortDescription || tool.shortDescription;
      tool.extraNotes = extraNotes || tool.extraNotes;
      tool.keyFeatures = keyFeatures || tool.keyFeatures;
      tool.imageUrl = imageUrl || image;

      await tool.save();
      res.json(tool);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

const DeleteTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    // Optionally, delete the image from Cloudinary
    if (tool.imageUrl) {
      await cloudinary.uploader.destroy(tool.imageUrl, {
        folder: "tools/images", // Make sure this matches the folder used during upload
      });
    }

    await tool.deleteOne();
    res.json({ message: "Tool deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const GetToolCatgeory = async (req, res) => {
  try {
    const categorys = await Tool.distinct("category");
    res.json({ categorys });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const GetToolSubCatgeory = async (req, res) => {
  try {
    const subcategory = await Tool.distinct("subcategory");
    res.json({ subcategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const DeleteToolImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "No image URL provided" });
    }

    // Extracting public_id correctly
    const parts = imageUrl.split("/");
    const filenameWithVersion = parts[parts.length - 1]; // "v1738850006/gqyin1txuznh4r4yrwtm.png"
    const filename = filenameWithVersion.split(".")[0]; // "gqyin1txuznh4r4yrwtm"

    // Delete the image from Cloudinary
    const response = await cloudinary.uploader.destroy(filename);
    console.log("Cloudinary response:", response);

    if (response.result !== "ok") {
      return res.status(400).json({ message: "Failed to delete image" });
    }
    await Tool.updateOne({ imageUrl: imageUrl }, { $set: { imageUrl: null } });

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  CreateTool,
  GetTool,
  SingleTool,
  UpdateTool,
  DeleteTool,
  GetToolSubCatgeory,
  GetToolCatgeory,
  DeleteToolImage,
};
