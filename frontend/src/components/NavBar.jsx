import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/png/logo.png";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  function handleNav() {
    setNavOpen(!navOpen);
  }

  // Prevent body scrolling when the navbar is open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navOpen]);

  return (
    <>
      <div className="custom_container">
        <div
          data-aos="fade-down"
          className="flex justify-between items-center py-6"
        >
          {/* Logo */}
          <div>
            <img className="cursor-pointer w-60" src={logo} alt="logo" />
          </div>

          {/* Navigation for large screens */}
          <nav className="hidden lg:flex gap-10">
            <ul className="flex gap-10">
              {[
                { name: "Home", path: "/" },
                { name: "Free Courses", path: "/freeCourse" },
                { name: "AI Toolbox", path: "/AiToolbox" },
                { name: "Newsletter", path: "/Newsletter" },
                { name: "About", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-normal text-lg text-white ${
                        isActive ? "font-bold" : "opacity-60"
                      } hover:opacity-100`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Join Now Button (Visible on large screens) */}
          {/* <div className="hidden lg:block">
            <button className="border border-[#313B3D] py-[9px] px-6 rounded-[200px] text-white font-semibold text-lg ">
              Join Now
            </button>
          </div> */}

          {/* Mobile Menu Button (☰ / ✖) */}
          <button
            onClick={handleNav}
            className="text-white lg:hidden z-50 relative text-3xl"
          >
            {navOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center z-50   ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button inside Menu */}
        <button
          onClick={handleNav}
          className="absolute top-5 right-5 text-white text-3xl z-50"
        >
          ✖
        </button>

        <ul className="flex flex-col gap-8 text-white text-xl">
          {[
            { name: "Home", path: "/" },
            { name: "Free Courses", path: "/freeCourse" },
            { name: "AI Toolbox", path: "/AiToolbox" },
            { name: "Newsletter", path: "/Newsletter" },
            { name: "About", path: "/about" },
          ].map((link) => (
            <li className="text-center" key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? "font-bold" : "opacity-60"
                  } hover:opacity-100`
                }
                onClick={() => setNavOpen(false)} // Close menu when a link is clicked
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black opacity-80 z-40"
          onClick={() => setNavOpen(false)}
        ></div>
      )}

      {/* Gradient Border */}
      <div className="border-[0.5px] bg-gradient-to-b from-[#0B0F0E] via-[#263531] to-[#0B0F0E] opacity-[10%]"></div>
    </>
  );
};

export default NavBar;
