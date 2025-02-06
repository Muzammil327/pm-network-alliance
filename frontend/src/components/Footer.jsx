import React from "react";
import logo from "../assets/images/png/logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#12181A] py-[64px] w-full mt-10">
      <div data-aos="fade-up" className="custom_container">
        <img className="cursor-pointer" src={logo} alt="" />

        <div className="flex flex-col lg:flex-row tracking-[0.3px]">
          <div className="lg:w-7/12 w-full">
            <ul className="flex flex-wrap  md:justify-start gap-5 md:gap-10 mt-6 md:mt-[46px]">
              {[
                { name: "Home", path: "/" },
                { name: "Free Courses", path: "/freeCourse" },
                { name: "AI Toolbox", path: "/AiToolbox" },
                { name: "Newsletter", path: "/Newsletter" },
                { name: "About", path: "/about" },
              ].map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `font-normal text-base md:text-lg  hover:text-white ${
                        isActive ? "text-white" : "text-white/60"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/3  w-full mt-5 lg:mt-0">
            <h4 className="font-normal text-base leading-6 text-white">
              Get the freshest news from us
            </h4>
            <div className="mt-3 flex">
              <input
                className="border border-[#313B3D] bg-transparent outline-none rounded-[200px] ps-4 text-white py-2 w-[285px]"
                type="text"
                placeholder="Your email address…"
              />
              <button className="ms-2 px-4 py-2 rounded-[200px] font-semibold text-base join_btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-[0.5px] bg-gradient-to-b from-[#0B0F0E] mt-[48px] via-[#263531] to-[#0B0F0E] opacity-[20%]"></div>

        <p className="text-center mt-[48px] font-normal text-[12px] leading-[16px] tracking-[0.26px] text-white">
          Design with love © TanahAirStudio 2020. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
