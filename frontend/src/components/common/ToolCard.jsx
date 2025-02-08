import PropTypes from "prop-types";
import { TiDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";

export default function ToolCard({
  image,
  title,
  description,
  link,
  category,
  filter,
  deleteCourse,
  updateCourse,
}) {
  return (
    <div className="bg-[#12181A] flex flex-col justify-between rounded-xl shadow-lg p-6 border border-[#313B3D] hover:border-[#00CCFF] transition-all cursor-pointer">
      <div className="">
        <div className="flex justify-between items-start">
          <img src={image} alt={title} className="w-10 h-10" />
          {/* Replace SVG with a div placeholder for future action */}
          <div className="opacity-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.29611 5.70386C9.29611 6.26386 9.74611 6.70386 10.2961 6.70386H15.8861L4.99611 17.5939C4.60611 17.9839 4.60611 18.6139 4.99611 19.0039C5.38611 19.3939 6.01611 19.3939 6.40611 19.0039L17.2961 8.11386V13.7039C17.2961 14.2539 17.7461 14.7039 18.2961 14.7039C18.8461 14.7039 19.2961 14.2539 19.2961 13.7039V5.70386C19.2961 5.15386 18.8461 4.70386 18.2961 4.70386H10.2961C9.74611 4.70386 9.29611 5.15386 9.29611 5.70386Z"
                fill="#778A8F"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-lg text-white font-medium mt-6">{title}</h3>
        <p
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          className="text-sm mt-2 text-[#778A8F]"
        >
          {description}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-[#778A8F]">{category}</span>

        {/* Admin Buttons - Positioned Correctly */}
        {filter === "admin" && (
          <div className="flex gap-3 items-center">
            <button
              className="flex items-center justify-center p-2 border-2 border-[#00CCFF] text-white rounded-lg hover:border-transparent hover:bg-[#00CCFF] transition-all"
              onClick={deleteCourse}
            >
              <TiDelete size={20} />
            </button>
            <a href={updateCourse}>
              <button className="flex items-center justify-center p-2 border-2 border-[#00CCFF] text-white rounded-lg hover:border-transparent hover:bg-[#00CCFF] transition-all">
                <GrUpdate size={18} />
              </button>
            </a>
          </div>
        )}

        {/* User Button */}
        {filter === "user" && (
          <a href={link}>
            <button className="px-3 sm:px-4 py-2 border-2 font-semibold text-xs sm:text-sm border-[#00CCFF] text-white rounded-full hover:border-transparent hover:bg-[#00CCFF] transition-all">
              Read More
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

// PropTypes validation
ToolCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  category: PropTypes.string,
  filter: PropTypes.string,
  updateCourse: PropTypes.func, // Changed to function
  deleteCourse: PropTypes.func,
};
