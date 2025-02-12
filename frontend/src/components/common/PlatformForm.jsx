import { useState, useEffect } from "react";
import usePlatformApi from "../../api/usePlatformApi";
import PropTypes from 'prop-types';


const PlatformForm = ({
  existingPlatform,
  onSuccess,
}) => {
  const {
    loading,
    error,
    createPlatform,
    updatePlatform,
  } = usePlatformApi();
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (existingPlatform) {
      setFormData({
        name: existingPlatform.name || "",
      });
    }
  }, [existingPlatform]);

  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingPlatform) {
        updatePlatform(existingPlatform?._id, { name: formData.name });
      } else {
        createPlatform({ name: formData.name });
      }

      onSuccess();

      setFormData({
        name: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 my-10 lg:mx-80 md:mx-60 sm:mx-20 mx-10"
    >
      <div>
        <label className="block text-sm mb-2 font-medium text-gray-100">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-600 py-3 border px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent text-white"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#12181A] py-3 px-12 text-white rounded-[200px]"
        >
          {loading
            ? "Loading..."
            : existingPlatform
            ? "Update Platform"
            : "Add Platform"}
        </button>
      </div>
    </form>
  );
};
PlatformForm.propTypes = {
  existingPlatform: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
  onSuccess: PropTypes.func.isRequired,
};

export default PlatformForm;
