import { useCallback, useEffect, useState } from "react";
// import { BoxShadow } from "../components/common/Icons";
import radialGradient from "../assets/images/png/radial_gradient_bg.png";
import CourseCard from "../components/common/CourseCard";
import axios from "axios";

const FreeCourse = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [platform, setPlatform] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const getCatgeory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/courses/get-catgeory`
      );
      setCategory(response.data.catgeory);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };
  const getPlatform = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/courses/get-platform`
      );
      setPlatform(response.data.platforms);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  const getCourse = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/courses/get?page=${currentPage}&limit=6&category=${selectedCategory}&platform=${selectedPlatform}&searchTerm=${searchTerm}`
      );
      setCoursesData(response.data.courses);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedPlatform, searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      getCourse(); // Load courses immediately when searchTerm is empty
      getCatgeory();
      getPlatform();
      return;
    }
  
    const delayDebounce = setTimeout(() => {
      getCourse(); // Delay API call when searchTerm is typed
    }, 2000);
  
    return () => clearTimeout(delayDebounce); 
  }, [currentPage, getCourse, searchTerm]);

  const toggleDropdownCategory = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page); // Set the current page
  };

  const handleCategorySelect = (selected) => {
    setSelectedPlatform("")
    setSelectedCategory(selected);
    setOpenDropdown(null); 
    setCurrentPage(1);
  };
  const handlePlatformSelect = (selected) => {
    setSelectedCategory("")
    setSelectedPlatform(selected);
    setOpenDropdown(null); 
    setCurrentPage(1);
  };
  
  return (
    <div className="custom_container px-4 sm:px-6 lg:px-8">
      {/* hero */}
      <div data-aos="fade-down" className="text-center py-16 sm:py-24 relative">
        <div className="absolute top-[75px] sm:top-0 -z-10">
          <img src={radialGradient} alt="" />
        </div>
        <div className="inline-block p-[2px] rounded-[200px] btn_animate">
          <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
            AI Training Courses
          </button>
        </div>
        <h1 className="font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[88px] leading-tight text-white my-4 sm:my-6 max-w-[900px] mx-auto">
          Advance Your Career in a Changing Tech Landscape
        </h1>
        <p className="text-white/60 max-w-[746px] mx-auto font-light text-base sm:text-xl md:text-2xl leading-7 sm:leading-10">
          Gain practical skills, stay ahead of emerging trends, and enhance your
          ability to deliver results in the tech industry.
        </p>
        <button className="mt-6 sm:mt-8 lg:mt-[48px]  text-lg sm:text-lg font-semibold py-4 px-8 sm:py-5 sm:px-8 rounded-full  !leading-[14px] tracking-[-0.2%] join_btn">
          Join Now for Free
        </button>
      </div>

      {/* courses */}
      <section>
        <div className="text-center">
          <div className="inline-block p-[2px] rounded-[200px] btn_animate">
            <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
              Course
            </button>
          </div>
          <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
            Explore Our Free AI Courses
          </h1>
          <p className="text-[#778A8F] font-normal text-sm sm:text-lg md:text-xl leading-6 sm:leading-7">
            Browse & Enroll in Courses Tailored to Your Needs
          </p>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          <div className="bg-[#12181A] border w-full max-w-sm md:w-80 flex items-center border-white border-opacity-10 rounded-full px-4 py-3">
            <input
              className="bg-transparent outline-none text-white flex-1"
              placeholder="Search tools..."
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="relative">
              <div
                onClick={() => toggleDropdownCategory("Platform")}
                className="flex bg-[#12181A] rounded-full border border-white border-opacity-10 py-2 px-4 items-center cursor-pointer"
              >
                <p className="text-white">Platform</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${
                    openDropdown === "Platform" ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M13.2292 7.5001L9.99583 10.7334L6.7625 7.5001C6.4375 7.1751 5.9125 7.1751 5.5875 7.5001C5.2625 7.8251 5.2625 8.3501 5.5875 8.6751L9.4125 12.5001C9.7375 12.8251 10.2625 12.8251 10.5875 12.5001L14.4125 8.6751C14.7375 8.3501 14.7375 7.8251 14.4125 7.5001C14.0875 7.18343 13.5542 7.1751 13.2292 7.5001Z"
                    fill="white"
                  />
                </svg>
              </div>

              {openDropdown === "Platform" && (
                <div className="absolute left-0 mt-2 w-40 bg-[#1E2528] text-white rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {platform.length > 0 ? (
                      platform?.map((data) => (
                        <li
                          key={data._id}
                          className="px-4 py-2 hover:bg-[#2A3336] cursor-pointer"
                          onClick={() => handlePlatformSelect(data)}
                        >
                          {data}{" "}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-400">No Platform</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <div
                onClick={() => toggleDropdownCategory("Category")}
                className="flex bg-[#12181A] rounded-full border border-white border-opacity-10 py-2 px-4 items-center cursor-pointer"
              >
                <p className="text-white">Category</p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform ${
                    openDropdown === "Category" ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M13.2292 7.5001L9.99583 10.7334L6.7625 7.5001C6.4375 7.1751 5.9125 7.1751 5.5875 7.5001C5.2625 7.8251 5.2625 8.3501 5.5875 8.6751L9.4125 12.5001C9.7375 12.8251 10.2625 12.8251 10.5875 12.5001L14.4125 8.6751C14.7375 8.3501 14.7375 7.8251 14.4125 7.5001C14.0875 7.18343 13.5542 7.1751 13.2292 7.5001Z"
                    fill="white"
                  />
                </svg>
              </div>

              {openDropdown === "Category" && (
                <div className="absolute left-0 mt-2 w-40 bg-[#1E2528] text-white rounded-lg shadow-lg z-10">
                  <ul className="py-2">
                    {category.length > 0 ? (
                      category.map((data) => (
                        <li
                          key={data._id}
                          className="px-4 py-2 hover:bg-[#2A3336] cursor-pointer"
                          onClick={() => handleCategorySelect(data)}
                        >
                          {data}{" "}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-400">No Categories</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {loading ? (
            <p>Loading...</p> // Show loading state
          ) : (
            coursesData &&
            coursesData?.map((course) => (
              <CourseCard
                key={course.id}
                title={course.courseTitle}
                description={course.keyPoints}
                duration={course.duration}
                link={course?.link}
                image={course.imageUrl}
                categoryFocus={course.categoryFocus}
                filter="user"
              />
            ))
          )}
        </div>

        {/* Pagination controls */}
        <div className="text-center pb-10 mt-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="py-3 px-6 rounded-[200px] bg-[#12181A] text-white"
            >
              Previous
            </button>
            <span className="py-3 px-6 rounded-[200px] text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="py-3 px-6 rounded-[200px] bg-[#12181A] text-white"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeCourse;
