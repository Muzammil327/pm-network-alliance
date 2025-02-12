import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import usePlatformApi from "../../api/usePlatformApi";
import useCategoryApi from "../../api/useCategoryApi";

const CourseForm = ({ existingCourse, onSuccess }) => {
  const [formData, setFormData] = useState({
    platform: "",
    categoryFocus: "",
    courseTitle: "",
    link: "",
    duration: "N/A",
    description: "",
    imageFile: null, // Store image file
  });

  console.log("formData platform:", formData.platform);

  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setExistingImage(existingCourse?.imageUrl ?? null);
    }
  }, [existingCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleDeleteImage = async (imageUrl) => {
    try {
      const response = await axios.delete(
        "https://backend.pmnetworkalliance.com/api/courses/delete-image",
        {
          data: { imageUrl },
        }
      );
      if (response.status === 200) {
        window.location.reload();
        setExistingImage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Append all text fields
      formDataToSend.append("platform", formData.platform);
      formDataToSend.append("categoryFocus", formData.categoryFocus);
      formDataToSend.append("courseTitle", formData.courseTitle);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("description", formData.description);

      // Append image file if it exists
      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile);
      } else if (existingImage) {
        formDataToSend.append("image", existingImage); // Keep existing image URL
      }

      if (existingCourse) {
        await axios.put(
          `https://backend.pmnetworkalliance.com/api/courses/update/${existingCourse._id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "https://backend.pmnetworkalliance.com/api/courses/create",
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

  const refreshImageUrl = (url) => `${url}?t=${Date.now()}`;

  const { platforms } = usePlatformApi();
  const { catgeorys } = useCategoryApi();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-10 lg:mx-80 md:mx-60 sm:mx-20 mx-10"
    >
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Platform
        </label>
        <select
          name="platform"
          value={formData.platform}
          onChange={(e) =>
            setFormData({ ...formData, platform: e.target.value })
          }
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        >
          <option value="" disabled>
            Select a Platform
          </option>
          {platforms.map((platform) => (
            <option
              key={platform._id}
              value={platform._id}
              className="text-black"
            >
              {platform.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Category/Focus
        </label>
        <select
          name="categoryFocus"
          value={formData.categoryFocus}
          onChange={(e) =>
            setFormData({ ...formData, categoryFocus: e.target.value })
          }
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        >
          <option value="" disabled>
            Select a Category/Focus
          </option>
          {catgeorys.map((catgeorys) => (
            <option
              key={catgeorys._id}
              value={catgeorys._id}
              className="text-black"
            >
              {catgeorys.name}
            </option>
          ))}
        </select>
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

      {/* Image Section */}
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Image
        </label>
        {existingImage ? (
          <div className="relative">
            <img
              src={refreshImageUrl(existingImage)}
              alt="Tool"
              className="w-full h-auto object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(existingImage)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full h-12 w-12 text-lg"
            >
              X
            </button>
          </div>
        ) : (
          <input
            type="file"
            name="imageFile"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
          />
        )}
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
CourseForm.propTypes = {
  existingCourse: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};

export default CourseForm;
