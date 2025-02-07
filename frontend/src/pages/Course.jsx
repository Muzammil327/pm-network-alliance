import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import CourseCard from "../components/common/CourseCard";

const Course = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getCourse = useCallback( async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://backend.pmnetworkalliance.com/api/courses/get?page=${currentPage}&limit=6`
      );
      setCoursesData(response.data.courses);
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
        `https://backend.pmnetworkalliance.com/api/courses/delete/${id}`
      );
      console.log("Course deleted:", response.data);
      getCourse(); // Re-fetch courses after deletion
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page changes
    setCurrentPage(page); // Set the current page
  };

  return (
    <React.Fragment>
      <div className="custom_container px-4 sm:px-6 lg:px-8">
        {/* courses */}
        <section>
          <div className="text-center !py-20">
            <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
              Courses
            </h1>
            <p className="text-[#778A8F] font-normal text-sm sm:text-lg md:text-xl leading-6 sm:leading-7">
              Browse & Enroll in Courses Tailored to Your Needs
            </p>
          </div>

          <div className="mt-10 flex items-end justify-end md:justify-end gap-4">
            <a href="/dashboard/courses/add">
              <div className="inline-block p-[2px] rounded-[200px] btn_animate">
                <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                  Add Course
                </button>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {loading ? (
              <p>Loading...</p> // Show loading state
            ) : (
              coursesData.map((course) => (
                <CourseCard
                  key={course._id}
                  title={course.courseTitle}
                  description={course.keyPoints}
                  duration={course.duration}
                  link={course?.link}
                  image={course.imageUrl}
                  categoryFocus={course.categoryFocus}
                  filter="admin"
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
      </div>
    </React.Fragment>
  );
};

export default Course;
