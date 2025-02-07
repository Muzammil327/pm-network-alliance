import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { motion } from "framer-motion";
import logo from "../assets/images/png/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormBox = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { email, password };

      const response = await axios.post("https://backend.pmnetworkalliance.com/api/users/login", data);

      console.log("response:", response)
      
      if(response.status !== 200) {
        throw new Error(response.data.message);
      }
      
      const { user } = response.data;
      // console.log("response data:", response.data)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard/courses");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6 bg_image">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          className="mb-[14px]"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={logo}
            alt="PM Network Alliance"
            className="mx-auto cursor-pointer"
          />
        </motion.div>

        <h2 className="text-6xl !leading-[96px] font-medium bg-gradient-to-r from-[#FFFFFF] to-[#9EB1B6] bg-clip-text text-transparent">
          Log In Now
        </h2>
        <p className="text-[#778A8F] font-light !text-sm mt-6">
          Join a network of professionals shaping the future of project.
        </p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-[10px] outline-none px-6 bg-transparent border border-[#FFFFFF1A] rounded-[70px] text-white placeholder:text-[#778A8F]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full py-[10px] outline-none px-6 bg-transparent border border-[#FFFFFF1A] rounded-full text-white placeholder:text-[#778A8F]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </button>
          </div>

          <div className="text-right pb-10">
            <a
              href="#"
              className="text-[#FF0000] font-light text-lg hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <motion.button
            className="w-full py-[21px] join_btn rounded-full text-lg !leading-[14px] font-semibold "
            type="submit"
          >
            Log In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FormBox;
