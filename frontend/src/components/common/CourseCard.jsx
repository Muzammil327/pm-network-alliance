import PropTypes from "prop-types";
import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";

export default function CourseCard({
  image,
  title,
  description,
  duration,
  link,
  categoryFocus,
  filter,
  deleteCourse,
  updateCourse,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#12181A] rounded-[20px] shadow-lg p-4 border border-[#313B3D] group cursor-pointer hover:border-[#00CCFF] transition-all">
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-hidden rounded-[20px]">
          <img
            src={image}
            alt={title}
            className="w-full object-cover h-60 rounded-[20px] group-hover:scale-[1.1] transition-all"
          />
        </div>
        <div className="text-white flex flex-col justify-between">
          {/* Top Section */}
          <div>
            <h3
              className="text-sm sm:text-base leading-[20.83px] font-medium mt-4 sm:mt-6"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="text-xs sm:text-sm mt-2 leading-[18.23px] text-[#778A8F] font-normal"
            >
              {description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-center mt-4 sm:mt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                {/* Duration Icon and Text */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.9925 0.5C3.8525 0.5 0.5 3.86 0.5 8C0.5 12.14 3.8525 15.5 7.9925 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 7.9925 0.5ZM8 14C4.685 14 2 11.315 2 8C2 4.685 4.685 2 8 2C11.315 2 14 4.685 14 8C14 11.315 11.315 14 8 14ZM8.375 4.25H7.25V8.75L11.1875 11.1125L11.75 10.19L8.375 8.1875V4.25Z"
                    fill="#778A8F"
                  />
                </svg>
                <span className="text-xs sm:text-sm text-[#778A8F] leading-[18.23px] flex gap-1 ml-1">
                  {duration}
                </span>
              </div>

              {/* Category Focus (Only for Users) */}
              {filter === "user" && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g id="Iconly/Curved/Category">
                      <g id="Category">
                        <path
                          id="Stroke 1"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.0003 6.6738C21.0003 8.7024 19.3551 10.3476 17.3265 10.3476C15.2979 10.3476 13.6536 8.7024 13.6536 6.6738C13.6536 4.6452 15.2979 3 17.3265 3C19.3551 3 21.0003 4.6452 21.0003 6.6738Z"
                          fill="#778A8F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Stroke 3"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.3467 6.6738C10.3467 8.7024 8.7024 10.3476 6.6729 10.3476C4.6452 10.3476 3 8.7024 3 6.6738C3 4.6452 4.6452 3 6.6729 3C8.7024 3 10.3467 4.6452 10.3467 6.6738Z"
                          fill="#778A8F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  </svg>
                  <span className="text-xs sm:text-sm text-[#778A8F] leading-[18.23px] flex gap-1 ml-1">
                    {categoryFocus}
                  </span>
                </div>
              )}
            </div>

            {/* Admin Controls */}
            {filter === "admin" && (
              <div className="flex gap-3">
                <button
                  className="px-2 py-2 border-2 font-semibold text-base sm:text-sm border-[#00CCFF] text-white rounded-[10px] hover:border-transparent hover:bg-[#00CCFF] transition-all"
                  onClick={() => setIsModalOpen(true)}
                >
                  <TiDelete size={28} />
                </button>
                <a href={updateCourse}>
                  <button className="px-3 py-3 border-2 font-semibold text-base sm:text-sm border-[#00CCFF] text-white rounded-[10px] hover:border-transparent hover:bg-[#00CCFF] transition-all">
                    <GrUpdate size={20} />
                  </button>
                </a>
              </div>
            )}

            {/* User "Read More" Button */}
            {filter === "user" && (
              <a href={link}>
                <button className="px-3 sm:px-4 py-2 border-2 font-semibold text-xs sm:text-sm border-[#00CCFF] text-white rounded-[200px] hover:border-transparent hover:bg-[#00CCFF] transition-all">
                  Take Course
                </button>
              </a>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1E2A30] text-white p-6 rounded-lg shadow-lg md:w-96">
            <h2 className="text-xl font-semibold">Confirm Deletion</h2>
            <p className="text-sm mt-2 text-[#B0BEC5]">
              Are you sure you want to delete this course? This action cannot be
              undone.
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
CourseCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  categoryFocus: PropTypes.string,
  filter: PropTypes.string,
  updateCourse: PropTypes.string,
  deleteCourse: PropTypes.func,
};
