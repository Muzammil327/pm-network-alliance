import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import PropTypes from "prop-types";

const GetCourse = ({ filter }) => {
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

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(
        `https://backend.pmnetworkalliance.com/api/courses/delete/${id}`
      );
      console.log("Course deleted:", response.data);
      getCourse(); // Re-fetch courses after deletion
    } catch (error) {
      console.error(error.message);
    }
  };

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
    <section>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center md:justify-between lg:gap-20 gap-4">
      {/* Search Input */}
        <div className="bg-[#12181A] border w-full max-w-md md:max-w-sm lg:w-[450px] flex items-center border-white border-opacity-10 rounded-full px-4 py-3">
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

        {/* Filters & Reset */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full">
            
            <div className="w-full">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="bg-[#12181A] text-white rounded-full border border-white border-opacity-10 py-2 px-4 cursor-pointer w-full"
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
            <div className="w-full">
              <select
                value={selectedPlatform}
                onChange={handlePlatformChange}
                className="bg-[#12181A] text-white rounded-full border border-white border-opacity-10 py-2 px-4 cursor-pointer w-full"
              >
                <option value="">Select Platform</option>
                {platform.length > 0 ? (
                  platform.map((data) => (
                    <option key={data._id} value={data}>
                      {data}
                    </option>
                  ))
                ) : (
                  <option disabled>No Platforms</option>
                )}
              </select>
            </div>
          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="bg-red-600 text-white rounded-full py-2 px-4 hover:bg-red-700 transition w-full sm:w-auto"
          >
            Reset
          </button>
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
              key={course._id}
              title={course.courseTitle}
              description={course.keyPoints}
              duration={course.duration}
              link={course?.link}
              image={course.imageUrl}
              categoryFocus={course.categoryFocus}
              filter={filter}
              deleteCourse={() => deleteCourse(course._id)}
              updateCourse={`/dashboard/courses/edit/${course._id}`}
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
  );
};

export default GetCourse;

// PropTypes validation
GetCourse.propTypes = {
  filter: PropTypes.string.isRequired,
};
