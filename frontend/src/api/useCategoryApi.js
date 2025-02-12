import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "https://backend.pmnetworkalliance.com/api/category";

const useCategoryApi = () => {
  const [catgeorys, setCatgeorys] = useState([]);
  const [catgeory, setCatgeory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null | "");

  // Fetch all catgeorys
  const GetCategorys = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get`);
      setCatgeorys(response.data);
    } catch (error) {
      setError(error || "Error fetching catgeorys");
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  // Fetch single catgeory
  const getCatgeoryById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      setCatgeory(response.data);
    } catch (error) {
      setError(error || "Error fetching catgeory");
    } finally {
      setLoading(false);
    }
  };

  // Create a new catgeory
  const createCatgeory = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, formData);

      if (response.data) {
        setCatgeorys((prev) => [...prev, response.data]);
      } else {
        await GetCategorys();
      }
    } catch (error) {
      setError(error || "Error creating catgeory");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing catgeory
  const updateCatgeory = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
      if(response.status === 200){
        await setCatgeorys();
      }
    } catch (error) {
      setError(error || "Error updating catgeory");
    } finally {
      setLoading(false);
    }
  };

  // Delete a catgeory
  const deleteCatgeory = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setCatgeorys((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      setError(error || "Error deleting catgeory");
    } finally {
      setLoading(false);
    }
  };

  // Fetch catgeorys on mount
  useEffect(() => {
    GetCategorys();
  }, [GetCategorys]);

  return {
    catgeorys,
    catgeory,
    loading,
    error,
    GetCategorys,
    getCatgeoryById,
    createCatgeory,
    updateCatgeory,
    deleteCatgeory,
  };
};

export default useCategoryApi;
