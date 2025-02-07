import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseForm from "../components/common/CourseForm";

const EditCourse = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/get/${id}`
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
    navigate("/dashboard/courses");
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <CourseForm existingCourse={selectedCourse} onSuccess={handleSuccess} />
    </>
  );
};

export default EditCourse;
