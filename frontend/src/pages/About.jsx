import React from "react";
import aboutimage from "../assets/images/png/aboutheroimage.png";
import meeting from "../assets/images/png/meeting.png";
import vision from "../assets/images/png/vision.png";
import { BoxShadow } from "../components/common/Icons";
import { ConnectCard } from "../components/common/Helper";

const About = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="custom_container px-4 sm:px-6 lg:px-8 ">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between py-5  2xl:py-[100px] gap-10 min-h-[calc(100vh-96px)]">
          {/* Left Content */}
          <div
            data-aos="fade-right"
            className="w-full lg:w-1/2 text-center lg:text-left relative z-10"
          >
            <h1 className="font-medium text-[30px] sm:text-[48px] lg:text-[65px] 2xl:text-[75px] leading-tight text-white tracking-tight">
              Future-Ready Technology Professionals
            </h1>
            <p className="text-[#778A8F] mt-4 sm:mt-6 font-light text-base sm:text-lg lg:text-xl xl:text-xl !leading-[36px]">
              Connect, Learn, and Stay Ahead in Tech Delivery. <br /> Join a
              network of professionals shaping the future of project, program,
              and product management.
            </p>
            <button className="mt-6 sm:mt-8 xl:mt-10 text-lg sm:text-lg font-semibold py-4 px-8 sm:py-5 sm:px-8 rounded-full tracking-[-0.2%] join_btn !leading-[14px]">
              Join Now for Free
            </button>
          </div>
          {/* Right Image */}
          <div
            data-aos="fade-left"
            className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-5/12 flex justify-center lg:justify-end relative"
          >
            <img
              src={aboutimage}
              alt="HeroPage"
              className="w-10/12 md:w-[80%] xl:w-[90%]"
            />
            <div className="absolute lg:right-[-70%] -z-10 top-[-20%]">
              <BoxShadow />
            </div>
          </div>
        </div>
        {/* About Us */}
        <div className="flex flex-col-reverse lg:flex-row py-[100px] justify-between gap-10">
          <div data-aos="fade-right" className="lg:w-7/12 w-full ">
            <h1 className="font-bold text-center lg:text-start text-[40px] xl:text-[40px] leading-[48px] text-white">
              About Us
            </h1>
            <p className="font-normal text-[17.72px] xl:text-[17.72px] leading-7 text-[#778A8F] mt-[26px]">
              The <span className="font-bold">PM network alliance</span> was
              founded by{" "}
              <span className="font-bold"> Govincorp Technology</span> group
              with a clean purpose: to build a community where{" "}
              <span className="font-bold">
                {" "}
                projects program, product managers, amd other technology
                professionals
              </span>{" "}
              can connect, lean, and stay ahead of the rapidly evolving
              landscape of technology delivery and execution. As technology
              reshapes the way we work, we saq a growing gap - one where
              delivery and execution. As technology reshapes the way we work, we
              saq a growing gap - one where delivery & execution professionals
              needed a dedicate space to exchange ideas, evaluate new tools, and
              prepare for the future of work. PM network alliance is our way of
              giving back, by creating a platform where professionals can come
              together to network, grow, and inspire each other.
            </p>
          </div>
          <div data-aos="fade-left" className="lg:w-5/12 w-full relative">
            <img
              className="w-full sm:w-[65%] lg:w-[100%] 2xl:w-[100%] mx-auto"
              src={meeting}
              alt="Meeting"
            />
            <div className="absolute right-[-70%] md:right-[-10%] lg:right-[-50%] -z-10 top-[-20%]">
              <BoxShadow />
            </div>
          </div>
        </div>
        {/* Vision */}
        <div className="flex flex-col lg:flex-row pb-[50px] md:pb-[100px] md:pt-[100px] justify-between gap-10">
          <div data-aos="fade-right" className="lg:w-5/12 w-full relative">
            <img
              className="w-full sm:w-[65%] lg:w-[100%] 2xl:w-[100%] mx-auto"
              src={vision}
              alt="Vision"
            />
            <div className="absolute right-[-70%] md:right-[-10%] lg:right-[-50%] -z-10 top-[-20%]">
              <BoxShadow />
            </div>
          </div>
          <div data-aos="fade-left" className="lg:w-7/12 w-full">
            <h1 className="font-bold text-center lg:text-start text-[40px] xl:text-[40px] leading-[48px] text-white">
              Our Vision is Simple
            </h1>
            <p className="font-normal text-[17.72px] xl:text-[17.72px] leading-7 text-[#778A8F] mt-[26px]">
              To provide faster, smarter, and move valuable career growth
              opportunities by offering exclusive networking events, curated
              insights, career development tools, and access to cutting -edge
              methodologies that help our members thrive. through monthly events
              hands-on tools reviews, we are setting a new standard for how
              technology professionals navigate the future of delivery and
              execution in the tech industry.
            </p>
          </div>
        </div>
        {/* Connect Section */}
        <div data-aos="fade-down">
          <div className="text-center">
            <h2 className="font-medium text-[30px] xl:text-[56px] nd:leading-[64px] text-white">
              Let's Connect Together
            </h2>
            <p className="mt-4 text-[20px] xl:text-[20px] leading-[26.04px] text-[#778A8F] mx-auto max-w-[610px]">
              We're not just managing programs, we’re shaping the future of how
              work gets done.
            </p>
          </div>
          <div className="mt-10 md:mt-[80px] md:pb-[100px] grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ConnectCard.map((card) => (
              <div
                key={card.id}
                className="bg-[#12181A] rounded-xl shadow-lg p-6 border border-[#313B3D] cursor-pointer hover:border-[#00CCFF] transition-all"
              >
                <div className="flex justify-between items-start">
                  <img src={card.image} alt={card.title} className="w-10 h-10" />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M9.29611 5.70386C9.29611 6.26386 9.74611 6.70386 10.2961 6.70386H15.8861L4.99611 17.5939C4.60611 17.9839 4.60611 18.6139 4.99611 19.0039C5.38611 19.3939 6.01611 19.3939 6.40611 19.0039L17.2961 8.11386V13.7039C17.2961 14.2539 17.7461 14.7039 18.2961 14.7039C18.8461 14.7039 19.2961 14.2539 19.2961 13.7039V5.70386C19.2961 5.15386 18.8461 4.70386 18.2961 4.70386H10.2961C9.74611 4.70386 9.29611 5.15386 9.29611 5.70386Z"
                        fill="#778A8F"
                      />
                    </g>
                  </svg>
                </div>
                <h3 className="text-lg text-white font-medium mt-6">
                  {card.title}
                </h3>
                <p className="text-sm text-[#778A8F] mt-2">{card.description}</p>
                <div className="flex justify-end">
                  <button className="px-4 py-2 border-2 mt-6 font-semibold text-sm border-[#00CCFF] text-white rounded-full hover:bg-[#00CCFF] transition-all">
                    Let's Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
