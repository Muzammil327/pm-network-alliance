
import CourseForm from "../components/common/CourseForm";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/dashboard/courses");
  };
  return <CourseForm onSuccess={handleSuccess} />;
};

export default AddCourse;
