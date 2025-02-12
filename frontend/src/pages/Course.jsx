import React from "react";
import GetCourse from "../components/common/GetCourse";

const Course = () => {
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
            <a href="/dashboard/platform/add">
              <div className="inline-block p-[2px] rounded-[200px] btn_animate">
                <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                  Add Platform
                </button>
              </div>
            </a>
            <a href="/dashboard/catgeory/add">
              <div className="inline-block p-[2px] rounded-[200px] btn_animate">
                <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                  Add Catgeory
                </button>
              </div>
            </a>
          </div>

         <GetCourse filter="admin"/>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Course;
