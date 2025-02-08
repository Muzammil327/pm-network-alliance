import { useCallback, useEffect, useState } from "react";
// import { BoxShadow } from "../components/common/Icons";
import radialGradient from "../assets/images/png/radial_gradient_bg.png";
import CourseCard from "../components/common/CourseCard";
import axios from "axios";

const FreeCourse = () => {
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
        `https://backend.pmnetworkalliance.com/api/courses/get-catgeory`
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
        `https://backend.pmnetworkalliance.com/api/courses/get-platform`
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
        `https://backend.pmnetworkalliance.com/api/courses/get?page=${currentPage}&limit=6&category=${selectedCategory}&platform=${selectedPlatform}&searchTerm=${searchTerm}`
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

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page); // Set the current page
  };

  const handleCategoryChange = (event) => {
    setSelectedPlatform("");
    setSearchTerm("");
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handlePlatformChange = (event) => {
    setSelectedCategory("");
    setSearchTerm("");
    const value = event.target.value;
    setSelectedPlatform(value);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedPlatform("");
    setSearchTerm("");
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
      <section className="md:!mt-16 mt-5">
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
                setSelectedCategory("");
                setSelectedPlatform("");
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {/* Category Dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="bg-[#12181A] text-white rounded-full border border-white border-opacity-10 py-2 px-4 cursor-pointer w-48"
              >
                <option value="">Select Category</option>
                {category.length > 0 ? (
                  category.map((data) => (
                    <option key={data._id} value={data}>
                      {data}
                    </option>
                  ))
                ) : (
                  <option disabled>No Categories</option>
                )}
              </select>
            </div>

            {/* Platform Dropdown */}
            <div>
              <select
                value={selectedPlatform}
                onChange={handlePlatformChange}
                className="bg-[#12181A] text-white rounded-full border border-white border-opacity-10 py-2 px-4 cursor-pointer w-48"
              >
                <option value="">Select Platform</option>
                {platform.length > 0 ? (
                  platform.map((data) => (
                    <option key={data._id} value={data}>
                      {data}
                    </option>
                  ))
                ) : (
                  <option disabled>No SubCategories</option>
                )}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="bg-red-600 text-white rounded-full py-2 px-4 hover:bg-red-700 transition"
            >
              Reset
            </button>
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
