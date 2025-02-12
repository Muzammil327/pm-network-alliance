import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";

export default function SimpleCard({ title, deleteCourse, updateCourse }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#12181A] flex flex-col justify-between rounded-xl shadow-lg p-6 border border-[#313B3D] hover:border-[#00CCFF] transition-all cursor-pointer">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-white font-medium">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <button
              className="flex items-center justify-center p-2 border-2 border-[#00CCFF] text-white rounded-lg hover:border-transparent hover:bg-[#00CCFF] transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              <TiDelete size={20} />
            </button>
            <a href={updateCourse}>
              <button className="flex items-center justify-center p-2 border-2 border-[#00CCFF] text-white rounded-lg hover:border-transparent hover:bg-[#00CCFF] transition-all">
                <GrUpdate size={18} />
              </button>
            </a>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-[#1E2A30] text-white p-6 rounded-lg shadow-lg md:w-96">
            <h2 className="text-xl font-semibold">Confirm Deletion</h2>
            <p className="text-sm mt-2 text-[#B0BEC5]">
              Are you sure you want to delete this platform? This action cannot
              be undone.
            </p>
            <div className="flex justify-end mt-4 gap-3">
              <button
                className="px-4 py-2 text-sm bg-gray-600 rounded-lg hover:bg-gray-700 transition-all"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-600 rounded-lg hover:bg-red-700 transition-all"
                onClick={deleteCourse}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// PropTypes validation
SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  updateCourse: PropTypes.func,
  deleteCourse: PropTypes.func,
};
