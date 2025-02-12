import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "https://backend.pmnetworkalliance.com/api/subCategory";

const useSubCategoryApi = () => {
  const [subCatgeorys, setSubcatgeorys] = useState([]);
  const [subCatgeory, setSubCatgeory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null | "");

  // Fetch all subCatgeorys
  const GetSubCategorys = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get`);
      setSubcatgeorys(response.data);
    } catch (error) {
      setError(error || "Error fetching subCatgeorys");
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  // Fetch single catgeory
  const getSubCatgeoryById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      setSubCatgeory(response.data);
    } catch (error) {
      setError(error || "Error fetching setSubcatgeorys");
    } finally {
      setLoading(false);
    }
  };

  // Create a new subCatgeory
  const createSubCatgeory = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, formData);
      setSubcatgeorys((prev) => [...prev, response.data]); // Update state with new catgeory
    } catch (error) {
      setError(error || "Error creating subCatgeory");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing subCatgeory
  const updateSubCatgeory = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
      setSubcatgeorys((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p))
      );
    } catch (error) {
      setError(error || "Error updating subcatgeory");
    } finally {
      setLoading(false);
    }
  };

  // Delete a sub catgeory
  const deleteSubCatgeory = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setSubcatgeorys((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      setError(error || "Error deleting catgeory");
    } finally {
      setLoading(false);
    }
  };

  // Fetch subCatgeorys on mount
  useEffect(() => {
    GetSubCategorys();
  }, [GetSubCategorys]);

  return {
    subCatgeorys,
    subCatgeory,
    loading,
    error,
    GetSubCategorys,
    getSubCatgeoryById,
    createSubCatgeory,
    updateSubCatgeory,
    deleteSubCatgeory,
  };
};

export default useSubCategoryApi;
