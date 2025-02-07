import React, { useState, useEffect } from "react";
import axios from "axios";

interface CourseFormProps {
  existingCourse?: any; // Pass existing course for edit mode
  onSuccess: () => void; // Callback to refresh course list
}

const CourseForm: React.FC<CourseFormProps> = ({
  existingCourse,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    platform: "",
    categoryFocus: "",
    courseTitle: "",
    link: "",
    duration: "N/A",
    description: "",
    imageFile: null as File | null, // Store image file
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data for edit mode
  useEffect(() => {
    if (existingCourse) {
      setFormData({
        platform: existingCourse.platform || "",
        categoryFocus: existingCourse.categoryFocus || "",
        courseTitle: existingCourse.courseTitle || "",
        link: existingCourse.link || "",
        duration: existingCourse.duration || "N/A",
        description: existingCourse.keyPoints || "",
        imageFile: null, // Keep existing image unless changed
      });
    }
  }, [existingCourse]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof typeof formData];
        if (key === "imageFile" && typeof value === "string") {
          formDataToSend.append(key, value);
        }
      });

      if (formData.imageFile) {
        formDataToSend.append("imageFile", formData.imageFile);
      }

      let response;
      if (existingCourse) {
        console.log(existingCourse)
        // **Update Course**
        response = await axios.put(
          `http://localhost:5000/api/courses/update/${existingCourse._id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // **Add Course**
        response = await axios.post(
          "http://localhost:5000/api/courses/create",
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      onSuccess(); // Refresh courses after submission
      setFormData({
        platform: "",
        categoryFocus: "",
        courseTitle: "",
        link: "",
        duration: "N/A",
        description: "",
        imageFile: null,
      });
    } catch (error) {
      setError("Failed to submit course");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-10 mx-80">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Platform
        </label>
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Category/Focus
        </label>
        <input
          type="text"
          name="categoryFocus"
          value={formData.categoryFocus}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Course Title
        </label>
        <input
          type="text"
          name="courseTitle"
          value={formData.courseTitle}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Link
        </label>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Duration
        </label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Image (Upload)
        </label>
        <input
          type="file"
          name="imageFile"
          onChange={handleImageChange}
          accept="image/*"
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#12181A] font-normal py-3 px-12 text-sm sm:text-base text-white rounded-[200px]"
        >
          {loading
            ? "Loading..."
            : existingCourse
            ? "Update Course"
            : "Add Course"}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
