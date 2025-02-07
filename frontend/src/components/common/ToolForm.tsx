import React, { useState, useEffect } from "react";
import axios from "axios";

interface ToolFormProps {
  existingTool?: any; // Pass existing tool for edit mode
  onSuccess: () => void; // Callback to refresh tool list
}

const ToolForm: React.FC<ToolFormProps> = ({ existingTool, onSuccess }) => {
  const [formData, setFormData] = useState({
    toolName: "",
    category: "",
    subcategory: "",
    shortDescription: "",
    keyFeatures: "",
    link: "",
    extraNotes: "",
    imageFile: null as File | null,
  });

  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const handleDeleteImage = async (imageUrl: string) => {

    try {
      const response = await axios.delete(
        "https://backend.pmnetworkalliance.com/api/delete-image", {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof typeof formData];
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

  const refreshImageUrl = (url: string) => `${url}?t=${Date.now()}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-10 mx-80">
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
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Sub Category
        </label>
        <input
          type="text"
          name="subcategory"
          value={formData.subcategory}
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

export default ToolForm;
