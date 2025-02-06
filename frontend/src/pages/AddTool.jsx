
import { useNavigate } from "react-router-dom";
import ToolForm from "../components/common/ToolForm";

const AddCourse = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/dashboard/tools");
  };
  return <ToolForm onSuccess={handleSuccess} />;
};

export default AddCourse;
