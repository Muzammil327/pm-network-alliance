import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ToolCard from "../components/common/ToolCard";

const Course = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getCourse = useCallback( async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/tools/get?page=${currentPage}&limit=9`
      );
      setCoursesData(response.data.tools);
      setTotalPages(response.data.totalPages); // Set total pages from the response
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getCourse();
  }, [currentPage, getCourse]);
  
  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tools/delete/${id}`
      );
      console.log("Course deleted:", response.data);
      getCourse();
    } catch (error) {
      console.error(error.message);
    }
  };
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page); // Set the current page
  };
  return (
    <div className="custom_container px-4 sm:px-6 lg:px-8">
      {/* courses */}
      <section>
        <div className="text-center !py-20">
          <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Tools
          </h1>
          <p className="text-[#778A8F] font-normal text-sm sm:text-lg md:text-xl leading-6 sm:leading-7">
          AI Tools to Boost Efficiency & Automation
          </p>
        </div>

        <div className="mt-10 flex items-end justify-end md:justify-end gap-4">
          <a href="/dashboard/tools/add">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                Add Tools
              </button>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {loading ? (
              <p>Loading...</p> // Show loading state
            ) : (coursesData &&
            coursesData?.map((course) => (
              <ToolCard
                key={course._id}
                title={course.toolName}
                description={course.shortDescription}
                duration={course.duration}
                link={course?.link}
                image={course.imageUrl}
                category={course.category}
                filter="admin"
                deleteCourse={() => deleteCourse(course._id)}
                updateCourse={`/dashboard/tools/edit/${course._id}`}
              />)
            ))}
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

export default Course;
