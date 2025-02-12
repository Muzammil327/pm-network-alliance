import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseForm from "../components/common/CourseForm";

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from URL
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://backend.pmnetworkalliance.com/api/courses/get/${id}`
        );
        console.log("response", response);
        setSelectedCourse(response.data);
      } catch (error) {
        setError("Failed to load course data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSuccess = () => {
    window.location.href = "/dashboard/courses";
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Edit Course
        </h1>
      </div>
      <CourseForm existingCourse={selectedCourse} onSuccess={handleSuccess} />
    </>
  );
};

export default EditCourse;
