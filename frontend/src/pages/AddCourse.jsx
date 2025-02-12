import CourseForm from "../components/common/CourseForm";

const AddCourse = () => {
  const handleSuccess = () => {
    window.location.href = "/dashboard/courses";
  };
  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Add Course
        </h1>
      </div>
      <CourseForm onSuccess={handleSuccess} />
    </>
  );
};

export default AddCourse;
