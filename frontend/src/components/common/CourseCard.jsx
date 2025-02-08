import PropTypes from "prop-types";
import React from "react";
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
  return (
    <div className="bg-[#12181A] rounded-[20px] shadow-lg p-4 border border-[#313B3D] group cursor-pointer hover:border-[#00CCFF] transition-all">
      <div className="overflow-hidden rounded-[20px]">
        <img
          src={image}
          alt={title}
          className="w-full object-cover h-60 rounded-[20px] group-hover:scale-[1.1] transition-all"
        />
      </div>
      <div className="text-white flex flex-col justify-between justify-self-end">
        <div>
        <h3 className="text-sm sm:text-base leading-[20.83px] font-medium mt-4 sm:mt-6"  style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
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

        <div className="flex justify-between items-center mt-4 sm:mt-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
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
            {filter === "admin" && (
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
                      <path
                        id="Stroke 5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.0003 17.2619C21.0003 19.2905 19.3551 20.9348 17.3265 20.9348C15.2979 20.9348 13.6536 19.2905 13.6536 17.2619C13.6536 15.2333 15.2979 13.5881 17.3265 13.5881C19.3551 13.5881 21.0003 15.2333 21.0003 17.2619Z"
                        fill="#778A8F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Stroke 7"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.3467 17.2619C10.3467 19.2905 8.7024 20.9348 6.6729 20.9348C4.6452 20.9348 3 19.2905 3 17.2619C3 15.2333 4.6452 13.5881 6.6729 13.5881C8.7024 13.5881 10.3467 15.2333 10.3467 17.2619Z"
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
          {filter === "admin" && (
            <div className="flex gap-3">
              <button
                className="px-2 py-2 border-2 font-semibold text-base sm:text-sm border-[#00CCFF] text-white rounded-[10px] hover:border-transparent hover:bg-[#00CCFF] transition-all"
                onClick={deleteCourse}
              >
                <TiDelete size={28} />{" "}
              </button>
              <a href={updateCourse}>
                <button className="px-3 py-3 border-2 font-semibold text-base sm:text-sm border-[#00CCFF] text-white rounded-[10px] hover:border-transparent hover:bg-[#00CCFF] transition-all">
                  <GrUpdate size={20} />{" "}
                </button>
              </a>
            </div>
          )}
          {filter === "user" && (
            <React.Fragment>
              <a href={link}>
                <button className="px-3 sm:px-4 py-2 border-2 font-semibold text-xs sm:text-sm border-[#00CCFF] text-white rounded-[200px] hover:border-transparent hover:bg-[#00CCFF] transition-all">
                  Read More
                </button>
              </a>
            </React.Fragment>
          )}
        </div>
      </div>
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
