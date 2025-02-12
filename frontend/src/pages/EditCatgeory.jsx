import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CatgeoryForm from "../components/common/CatgeoryForm";

const EditCatgeory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://backend.pmnetworkalliance.com/api/category/get/${id}`
        );
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
    navigate("/dashboard/catgeory");
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="text-center !py-20">
        <h1 className="my-3 sm:my-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight text-white">
          Edit Catgeory
        </h1>
      </div>
      <CatgeoryForm
        existingCatgeory={selectedCourse}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default EditCatgeory;
