import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useCategoryApi from "../../api/useCategoryApi";
import useSubCategoryApi from "../../api/useSubCategoryApi";

const ToolForm = ({ existingTool, onSuccess }) => {
  const [formData, setFormData] = useState({
    toolName: "",
    category: "",
    subcategory: "",
    shortDescription: "",
    keyFeatures: "",
    link: "",
    extraNotes: "",
    imageFile: null,
  });

  const [existingImage, setExistingImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingTool) {
      setFormData({
        toolName: existingTool.toolName || "",
        category: existingTool.category || "",
        subcategory: existingTool.subcategory || "",
        link: existingTool.link || "",
        shortDescription: existingTool.shortDescription || "",
        keyFeatures: existingTool.keyFeatures || "",
        extraNotes: existingTool.extraNotes || "",
        imageFile: null,
      });

      setExistingImage(existingTool.imageUrl || null); // Store existing image URL
    }
  }, [existingTool]);

  const handleChange = (
    e
  ) => {
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
        "https://backend.pmnetworkalliance.com/api/tools/delete-image", {
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
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (key !== "imageFile" && typeof value === "string") {
          formDataToSend.append(key, value);
        }
      });

      if (formData.imageFile) {
        formDataToSend.append("image", formData.imageFile); // New image file
      } else if (existingImage) {
        formDataToSend.append("image", existingImage); // Keep existing image URL
      }

      let response;
      if (existingTool) {
        response = await axios.put(
          `https://backend.pmnetworkalliance.com/api/tools/update/${existingTool._id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "https://backend.pmnetworkalliance.com/api/tools/create",
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      console.log("Response:", response.data);
      onSuccess();

      setFormData({
        toolName: "",
        category: "",
        subcategory: "",
        link: "",
        shortDescription: "",
        keyFeatures: "",
        extraNotes: "",
        imageFile: null,
      });

      setExistingImage(null);
    } catch (error) {
      setError("Failed to submit tool");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshImageUrl = (url) => `${url}?t=${Date.now()}`;

  const { catgeorys } = useCategoryApi();
  const { subCatgeorys } = useSubCategoryApi();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-10 lg:mx-80 md:mx-60 sm:mx-20 mx-10">
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Tool Name
        </label>
        <input
          type="text"
          name="toolName"
          value={formData.toolName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Category/Focus
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
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
          Sub Category
        </label>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={(e) =>
            setFormData({ ...formData, subcategory: e.target.value })
          }
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        >
          <option value="" disabled>
            Select a Sub Category
          </option>
          {subCatgeorys.map((catgeorys) => (
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
          Short Description
        </label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Key Features
        </label>
        <textarea
          name="keyFeatures"
          value={formData.keyFeatures}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Extra Notes
        </label>
        <input
          type="text"
          name="extraNotes"
          value={formData.extraNotes}
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
              type="button" onClick={() => handleDeleteImage(existingImage)}

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
          className="bg-[#12181A] py-3 px-12 text-white rounded-[200px]"
        >
          {loading ? "Loading..." : existingTool ? "Update Tool" : "Add Tool"}
        </button>
      </div>
    </form>
  );
};
ToolForm.propTypes = {
  existingTool: PropTypes.shape({
    toolName: PropTypes.string,
    category: PropTypes.string,
    subcategory: PropTypes.string,
    shortDescription: PropTypes.string,
    keyFeatures: PropTypes.string,
    link: PropTypes.string,
    extraNotes: PropTypes.string,
    imageUrl: PropTypes.string,
    _id: PropTypes.string,
  }),
  onSuccess: PropTypes.func.isRequired,
};

export default ToolForm;
