import React, { useEffect, useState } from "react";
import HeroImage from "../assets/images/png/bgHero.png";
import { Whatexpect, CommunitySays } from "../components/common/Helper";
import { BoxShadow } from "../components/common/Icons";
import { motion } from "framer-motion";

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [fontSize, setFontSize] = useState("");
  const [lineHeight, setLineHeight] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const bodyStyles = window.getComputedStyle(document.body);
      setFontSize(bodyStyles.fontSize);
      setLineHeight(bodyStyles.lineHeight);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const HeroPage = () => {
  const { width, height } = useWindowSize();
  return (
    <div className="overflow-x-hidden">
      <div className="custom_container px-4 sm:px-6 lg:px-8 ">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center pb-10  justify-between sm:py-10 md:py-10 2xl:py-[100px] gap-10 min-h-[calc(100vh-96px)]">
          {/* Left Content */}
          <div
            data-aos="fade-right"
            className="w-full lg:w-1/2 text-center lg:text-left relative z-10"
          >
            <h1 className="font-medium text-[36px] sm:text-[48px] lg:text-[75px] 2xl:text-[88px]  text-white tracking-tight !leading-[96px]">
              Future-Ready Technology Professionals
            </h1>
            <p className="text-[#778A8F] mt-4 sm:mt-6 font-light text-base sm:text-lg lg:text-xl 2xl:text-2xl">
              Connect, Learn, and Stay Ahead in Tech Delivery <br /> Join a
              network of professionals shaping the future of project, program,
              and product management.
            </p>
            <button className="mt-6 sm:mt-8 2xl:mt-[48px] text-lg sm:text-lg font-semibold py-4 px-8 sm:py-5 sm:px-8 rounded-full  !leading-[14px] tracking-[-0.2%] join_btn">
              Join Now
            </button>
          </div>

          {/* Right Image */}
          <div
            data-aos="fade-left"
            className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-6/12 xl:w-4/12 2xl
            :w-5/12 flex justify-center lg:justify-start relative mt-0"
          >
            <img
              src={HeroImage}
              alt="HeroPage"
              className="w-10/12 md:w-[80%] 2xl:w-[90%]"
            />
            <div className="absolute lg:right-[-60%] -z-10 top-[-43%]">
              <BoxShadow />
            </div>
          </div>
        </div>

        {/* What to Expect Section */}
        <div
          data-aos="fade-up"
          className="flex flex-col lg:flex-row pt-0 md:py-16 lg:py-[100px] gap-10"
        >
          {/* Left Section */}
          <div className="lg:w-1/2 w-full text-center lg:text-left relative ">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                What We Offer
              </button>
            </div>
            <h2 className="font-medium text-[28px] sm:text-[36px] lg:text-[56px] leading-tight text-white mt-4 sm:mt-[32px]">
              What To Expect
            </h2>
            <p className="mt-4 text-[#778A8F] font-normal text-sm sm:text-[18px] lg:text-[20px] !leading-[26.04px]">
            Build connections with industry peers, Insights from thought leaders and industry experts, Practical knowledge to enhance product delivery, Industry news and trends through curated content.
            </p>
          </div>

          {/* Right Section - Responsive Grid Layout */}
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Whatexpect.map((item) => (
              <div
                key={item.id}
                className="bg-[#12181A] p-5 rounded-[20px] border-[#313B3D] border text-center sm:text-left cursor-pointer hover:border-[#00CCFF] transition-all"
              >
                <div className="flex justify-center sm:justify-start">
                  <img
                    className="w-[40px] sm:w-[48px] h-[40px] sm:h-[48px] object-cover"
                    src={item.img}
                    alt="icon"
                  />
                </div>
                <h2 className="text-white mt-3 font-medium text-sm sm:text-base">
                  {item.profession}
                </h2>
                <p className="mt-2 text-[#778A8F] font-medium text-sm sm:text-base">
                  {item.desc}
                </p>
                <button className="text-[#00CCFF] mt-1 font-medium text-sm sm:text-base">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Testimonials */}
        <div data-aos="zoom-in" className="py-16 lg:py-[100px]">
          <div className="text-center">
            <div className="inline-block p-[2px] rounded-[200px] btn_animate">
              <button className="bg-[#12181A] font-normal py-3 px-4  text-sm sm:text-base text-white rounded-[200px]">
                Testimonial
              </button>
            </div>
            <h1 className="text-white my-4 text-[32px] sm:text-[48px] lg:text-[64px] font-medium leading-tight">
              What Our Community Says
            </h1>
            <p className="text-[#778A8F] font-normal text-sm sm:text-[18px] lg:text-[20px] max-w-[606px] mx-auto !leading-[26.04px]">
              Real stories from professionals who have transformed their careers
              with our network, insights, and resources.
            </p>
          </div>

          <div className="lg:grid grid-cols-3 gap-5 relative overflow-hidden h-[630px] ps-[10px] hidden mt-[48px]">
            <div className="w-full h-[160px] bg-gradient-to-t to-[#000000] from-[rgba(11,12,15,0)] absolute !top-0 z-10"></div>

            <div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-col flex-shrink-0 "
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer  mt-5">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-shrink-0 flex-col"
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer  mt-5">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            <div>
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "0" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-col flex-shrink-0 "
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer  mt-5">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "0" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-shrink-0 flex-col"
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer  mt-5">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            <div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-col flex-shrink-0 "
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer  mt-5">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-shrink-0 flex-col"
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer  mt-5">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <div className="w-full h-[180px] bg-gradient-to-t from-[#000000] to-[rgba(11,12,15,0)] absolute bottom-[64px] lg:bottom-[100px] z-10"></div>

          <div className="flex flex-col lg:hidden relative overflow-hidden mt-[48px]">
            <div className="absolute left-0 top-0 w-[10%] h-full bg-gradient-to-r from-[#000000] to-[rgba(11,12,15,0)] z-10"></div>
            <div className="absolute right-0 top-0 w-[10%] h-full bg-gradient-to-l from-[#000000] to-[rgba(11,12,15,0)] z-10"></div>
            <div className="flex relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "-0%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex  flex-shrink-0 "
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer ms-5 mt-5 w-[300px] border border-[#313B3D]">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "-0%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-shrink-0"
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer ms-5  mt-5 w-[300px] border border-[#313B3D]">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="flex">
              <motion.div
                initial={{ x: "0" }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex  flex-shrink-0 "
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer ms-5 mt-5 w-[300px] border border-[#313B3D]">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div
                initial={{ x: "0" }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-shrink-0"
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer ms-5  mt-5 w-[300px] border border-[#313B3D]">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="flex">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "-0%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex  flex-shrink-0 "
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer ms-5 mt-5 w-[300px] border border-[#313B3D]">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "-0%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className=" flex flex-shrink-0"
              >
                {CommunitySays.map((item) => {
                  return (
                    <div className="bg-[#12181A] rounded-[20px] p-5 cursor-pointer ms-5  mt-5 w-[300px] border border-[#313B3D]">
                      <p className="text-[#778A8F] font-light text-sm sm:text-base">
                        {item.desc}
                      </p>
                      <div className="mt-6 flex items-center">
                        <div className="w-12 h-12">
                          <img
                            src={item.img}
                            alt="testimonial"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="ms-3">
                          <p className="font-normal text-sm sm:text-base text-white">
                            {item.name}
                          </p>
                          <p className="mt-1 text-[#778A8F] font-normal text-xs sm:text-sm">
                            {item.work}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
