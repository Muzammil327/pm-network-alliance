import ToolForm from "../components/common/ToolForm";

const AddCourse = () => {
  const handleSuccess = () => {
    window.location.href = "/dashboard/tools";
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
