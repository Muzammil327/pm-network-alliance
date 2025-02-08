import radialGradient from "../assets/images/png/radial_gradient_bg.png";
import GetCourse from "../components/common/GetCourse";

const FreeCourse = () => {
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

        <GetCourse filter="user" />
      </section>
    </div>
  );
};

export default FreeCourse;
