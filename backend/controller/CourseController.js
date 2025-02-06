import Course from "../model/CourseModel.js";
import cloudinary from "../util/cloudinary.js";
import formidable from "formidable";

const CreateCourse = async (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(400).send("Error parsing the form.");
    }

    try {
      const platform = fields.platform[0];
      const categoryFocus = fields.categoryFocus[0];
      const courseTitle = fields.courseTitle[0];
      const link = fields.link[0];
      const duration = fields.duration[0];
      const description = fields.description[0];

      // Upload image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(
        files.imageFile[0].filepath,
        {
          folder: "courses/images",
        }
      );

      // Create course with uploaded image URL
      const newCourse = new Course({
        platform,
        categoryFocus,
        courseTitle,
        keyPoints: description,
        link,
        duration,
        imageUrl: uploadResponse.secure_url, // Cloudinary URL
      });

      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

const GetCourse = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page to 1
    const limit = parseInt(req.query.limit) || 6; // Default limit to 6
    const category = req.query.category?.trim();
    const platform = req.query.platform?.trim();
    const searchTerm = req.query.searchTerm;

    const skip = (page - 1) * limit;

    let filter = {}; // Default: No filter

    if (category) {
      filter.categoryFocus = category;
    }
    if (platform) {
      filter.platform = platform;
    }
    if (searchTerm) {
      filter.$or = [
        { courseTitle: { $regex: searchTerm, $options: 'i' } },
        { keyPoints: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const courses = await Course.find(filter).skip(skip).limit(limit);
    const totalCourses = await Course.countDocuments(filter); // Count filtered courses
    const totalPages = Math.ceil(totalCourses / limit);

    res.json({
      courses,
      currentPage: page,
      totalPages,
      totalCourses,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const SingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const UpdateCourse = async (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(400).send("Error parsing the form.");
    }

    try {
      const platform = fields.platform?.[0];
      const categoryFocus = fields.categoryFocus?.[0];
      const courseTitle = fields.courseTitle?.[0];
      const link = fields.link?.[0];
      const duration = fields.duration?.[0];
      const description = fields.description?.[0]; // Updated from keyPoints

      // Check if the course exists
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // If a new image is provided, upload it to Cloudinary
      let imageUrl = course.imageUrl;
      if (files.imageFile) {
        const uploadResponse = await cloudinary.uploader.upload(
          files.imageFile[0].filepath,
          {
            folder: "courses/images",
          }
        );
        imageUrl = uploadResponse.secure_url;
      }

      // Update the course with new data
      course.platform = platform || course.platform;
      course.categoryFocus = categoryFocus || course.categoryFocus;
      course.courseTitle = courseTitle || course.courseTitle;
      course.link = link || course.link;
      course.duration = duration || course.duration;
      course.description = description || course.description; // Replaced keyPoints
      course.imageUrl = imageUrl;

      await course.save();
      res.json(course);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

const DeleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Optionally, delete the image from Cloudinary
    await cloudinary.uploader.destroy(course.imageUrl, {
      folder: "courses/images", // Make sure this matches the folder used during upload
    });

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const GetCoursePlatform = async (req, res) => {
  try {
    const platforms = await Course.distinct("platform");
    res.json({ platforms });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const GetCourseCatgeory = async (req, res) => {
  try {
    const catgeory = await Course.distinct("categoryFocus");
    res.json({ catgeory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  CreateCourse,
  GetCourse,
  SingleCourse,
  UpdateCourse,
  DeleteCourse,
  GetCoursePlatform,
  GetCourseCatgeory,
};
