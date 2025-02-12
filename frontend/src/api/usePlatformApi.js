import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "https://backend.pmnetworkalliance.com/api/platform";

const usePlatformApi = () => {
  const [platforms, setPlatforms] = useState([]);
  const [platform, setPlatform] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null | "");

  // Fetch all platforms
  const getPlatforms = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get`);
      setPlatforms(response.data);
    } catch (error) {
      setError(error || "Error fetching platforms");
    } finally {
      setLoading(false);
    }
  }, [setError, setLoading]);

  // Fetch single platform
  const getPlatformById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      setPlatform(response.data);
    } catch (error) {
      setError(error || "Error fetching platform");
    } finally {
      setLoading(false);
    }
  };

  // Create a new platform
  const createPlatform = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, formData);
      setPlatforms((prev) => [...prev, response.data]); // Update state with new platform
    } catch (error) {
      setError(error || "Error creating platform");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing platform
  const updatePlatform = async (id, updatedData) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
      setPlatforms((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updatedData } : p))
      );
    } catch (error) {
      setError(error || "Error updating platform");
    } finally {
      setLoading(false);
    }
  };

  // Delete a platform
  const deletePlatform = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setPlatforms((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      setError(error || "Error deleting platform");
    } finally {
      setLoading(false);
    }
  };

  // Fetch platforms on mount
  useEffect(() => {
    getPlatforms();
  }, [getPlatforms]);

  return {
    platforms,
    platform,
    loading,
    error,
    getPlatforms,
    getPlatformById,
    createPlatform,
    updatePlatform,
    deletePlatform,
  };
};

export default usePlatformApi;
