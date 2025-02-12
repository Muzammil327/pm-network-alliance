import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import FreeCourse from "./pages/FreeCourse";
import HeroPage from "./pages/HeroPage";
import AiToolbox from "./pages/AiToolbox";
import NewsLetter from "./pages/NewsLetter";
import Login from "./pages/Login";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import About from "./pages/About";
import Course from "./pages/Course";
import AddCourse from "./pages/AddCourse";
import Tool from "./pages/Tool";
import AddTool from "./pages/AddTool";
import EditCourse from "./pages/EditCourse";
import EditTool from "./pages/EditTool";
import DashboardNavBar from "./components/DashboardNavBar";
import Platform from "./pages/Platform";
import AddPlatform from "./pages/AddPlatform";
import EditPlatform from "./pages/EditPlatform";
import Catgeory from "./pages/Catgeory";
import AddCatgeory from "./pages/AddCatgeory";
import EditCatgeory from "./pages/EditCatgeory";
import AddSubCatgeory from "./pages/AddSubCatgeory";
import SubCatgeory from "./pages/SubCatgeory";
import EditSubCatgeory from "./pages/EditSubCatgeory";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavFooter = location.pathname.startsWith("/dashboard");
  const hideNavFooter2 = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    const token = localStorage.getItem("token");
    if (!token && location.pathname.startsWith("/dashboard")) {
      navigate("/admin");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {!hideNavFooter && !hideNavFooter2 && <NavBar />}
      {hideNavFooter && <DashboardNavBar />}
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/" element={<HeroPage />} />
        <Route path="/freeCourse" element={<FreeCourse />} />
        <Route path="/AiToolbox" element={<AiToolbox />} />
        <Route path="/Newsletter" element={<NewsLetter />} />
        <Route path="/about" element={<About />} />
        
        <Route path="/dashboard/courses" element={<Course />} />
        <Route path="/dashboard/courses/add" element={<AddCourse />} />
        <Route path="/dashboard/courses/edit/:id" element={<EditCourse />} />

        <Route path="/dashboard/platform" element={<Platform />} />
        <Route path="/dashboard/platform/add" element={<AddPlatform />} />
        <Route path="/dashboard/platform/edit/:id" element={<EditPlatform />} />

        <Route path="/dashboard/catgeory" element={<Catgeory />} />
        <Route path="/dashboard/catgeory/add" element={<AddCatgeory />} />
        <Route path="/dashboard/catgeory/edit/:id" element={<EditCatgeory />} />

        <Route path="/dashboard/subcatgeory" element={<SubCatgeory />} />
        <Route path="/dashboard/subcatgeory/add" element={<AddSubCatgeory />} />
        <Route path="/dashboard/subcatgeory/edit/:id" element={<EditSubCatgeory />} />

        <Route path="/dashboard/tools" element={<Tool />} />
        <Route path="/dashboard/tools/add" element={<AddTool />} />
        <Route path="/dashboard/tools/edit/:id" element={<EditTool />} />
      </Routes>
      {!hideNavFooter && !hideNavFooter2 && <Footer />}
    </>
  );
}

export default App;
