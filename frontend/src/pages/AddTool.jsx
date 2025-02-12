import { useNavigate } from "react-router-dom";
import ToolForm from "../components/common/ToolForm";

const AddCourse = () => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    navigate("/dashboard/tools");
  };
  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Add Tool
        </h1>
      </div>{" "}
      <ToolForm onSuccess={handleSuccess} />
    </>
  );
};

export default AddCourse;
