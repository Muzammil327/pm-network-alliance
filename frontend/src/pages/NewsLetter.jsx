import React from "react";
import { Highlights, WhatGet } from "../components/common/Helper";
import radialGradient from "../assets/images/png/radial_gradient_bg.png";
const NewsLetter = () => {
  return (
    <div className="custom_container px-4 sm:px-6 lg:px-8">
      <div
        data-aos="fade-down"
        className="text-center py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 relative"
      >
        <div className="absolute top-[75px] sm:top-0 -z-10">
          <img src={radialGradient} alt="" />
        </div>
        <div className="inline-block p-[2px] rounded-[200px] btn_animate">
          <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
            AI Toolbox
          </button>
        </div>
        <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-tight text-white my-4 sm:my-6 max-w-3xl mx-auto !md:leading-[96px]">
          Stay Updated with the PMNA Newsletter
        </h1>
        <p className="text-white/60 max-w-2xl mx-auto font-light text-base sm:text-lg md:text-xl leading-relaxed">
          Stay ahead in the world of project management with expert insights,
          cutting-edge AI trends, and exclusive community updates.
        </p>
        <button className="mt-8 sm:mt-12 join_btn text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full  !leading-[14px]">
          Join Now for Free
        </button>
      </div>

      {/* What You’ll Get Section */}
      <section>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white my-4">
            What You’ll Get
          </h1>
          <p className="text-[#778A8F] font-normal text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 sm:mt-16"
        >
          {WhatGet.map((item, index) => (
            <div
              key={index}
              className="bg-[#12181A] border border-[#313B3D] rounded-2xl p-6 text-center cursor-pointer hover:border-[#00CCFF] transition-all"
            >
              <img src={item.img} alt="" className="mx-auto" />
              <h3 className="font-medium text-lg text-white mt-4">
                {item.profession}
              </h3>
              <p className="mt-2 text-[#778A8F] text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Highlights */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-white my-4">
            Past Newsletter Highlights
          </h1>
          <p className="text-[#778A8F] text-base sm:text-lg max-w-xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
          {Highlights.map((item, index) => (
            <div
              key={index}
              className="bg-[#12181A] border border-[#313B3D] rounded-2xl p-5 cursor-pointer group hover:border-[#00CCFF] transition-all"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-[1.1] transition-all"
                />
              </div>
              <h3 className="text-lg font-medium text-white mt-5">
                {item.title}
              </h3>
              <p className="text-sm text-[#778A8F] mt-2">{item.description}</p>
              <div className="flex gap-1 items-center mt-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.9925 1.5C4.8525 1.5 1.5 4.86 1.5 9C1.5 13.14 4.8525 16.5 8.9925 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 8.9925 1.5ZM9 15C5.685 15 3 12.315 3 9C3 5.685 5.685 3 9 3C12.315 3 15 5.685 15 9C15 12.315 12.315 15 9 15ZM9.375 5.25H8.25V9.75L12.1875 12.1125L12.75 11.19L9.375 9.1875V5.25Z"
                    fill="#778A8F"
                  />
                </svg>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
