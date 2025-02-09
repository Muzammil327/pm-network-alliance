import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "./ToolCard";
import PropTypes from "prop-types";

const GetTools = ({filter}) => {
  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // const [openDropdown, setOpenDropdown] = useState(null);

  const [subCatgeory, setSubCatgeory] = useState([]);
  const [selectedSubCatgeory, setSelectedSubCatgeory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const getCatgeory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend.pmnetworkalliance.com/api/tools/get-catgeory`
      );
      setCategory(response.data.categorys);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };
  const getSubCatgeory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend.pmnetworkalliance.com/api/tools/get-subcatgeory`
      );
      setSubCatgeory(response.data.subcategory);
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
        `https://backend.pmnetworkalliance.com/api/tools/get?page=${currentPage}&limit=12&category=${selectedCategory}&subcatgeory=${selectedSubCatgeory}&searchTerm=${searchTerm}`
      );
      setCoursesData(response.data.tools);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory, selectedSubCatgeory]);

  useEffect(() => {
    if (!searchTerm) {
      getCourse(); // Load courses immediately when searchTerm is empty
      getCatgeory();
      getSubCatgeory();
      return;
    }

    const delayDebounce = setTimeout(() => {
      getCourse(); // Delay API call when searchTerm is typed
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, getCourse, searchTerm]);

  // const toggleDropdownCategory = (item) => {
  //   setOpenDropdown(openDropdown === item ? null : item);
  // };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page); // Set the current page
  };

  const handleCategoryChange = (event) => {
    setSelectedSubCatgeory("");
    setSearchTerm("");
    const value = event.target.value;
    setSelectedCategory(value);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedCategory("");
    setSearchTerm("");
    const value = event.target.value;
    setSelectedSubCatgeory(value);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedSubCatgeory("");
    setSearchTerm("");
  };
  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(
        `https://backend.pmnetworkalliance.com/api/tools/delete/${id}`
      );
      console.log("Course deleted:", response.data);
      getCourse();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <section>
      <div className="mt-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
        <div className="bg-[#12181A] border w-full max-w-sm md:w-80 flex items-center border-white border-opacity-10 rounded-full px-4 py-3">
          <input
            className="bg-transparent outline-none text-white flex-1"
            placeholder="Search tools..."
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSelectedCategory("");
              setSelectedSubCatgeory("");
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

          {/* SubCategory Dropdown */}
          <div>
            <select
              value={selectedSubCatgeory}
              onChange={handleSubCategoryChange}
              className="bg-[#12181A] text-white rounded-full border border-white border-opacity-10 py-2 px-4 cursor-pointer w-48"
            >
              <option value="">Select SubCategory</option>
              {subCatgeory.length > 0 ? (
                subCatgeory.map((data) => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {loading ? (
          <p>Loading...</p> // Show loading state
        ) : (
          coursesData &&
          coursesData?.map((card) => (
            <ToolCard
              key={card._id}
              title={card.toolName}
              description={card.shortDescription}
              duration={card.duration}
              link={card?.link}
              image={card.imageUrl}
              category={card.category}
              filter={filter}
              deleteCourse={() => deleteCourse(card._id)}
              updateCourse={`/dashboard/tools/edit/${card._id}`}
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

export default GetTools;

// PropTypes validation
GetTools.propTypes = {
  filter: PropTypes.string.isRequired,
};
