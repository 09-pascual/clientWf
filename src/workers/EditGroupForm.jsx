import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGroupById, updateGroup } from "../services/GroupServices";

export const EditGroupForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    // Check if id exists before making the API call
    if (!id) {
      setError("Invalid team ID");
      setLoading(false);
      return;
    }

    getGroupById(id)
      .then((data) => {
        // Check if data exists and has the required properties
        if (data && typeof data === "object") {
          setFormData({
            name: data.name || "",
            description: data.description || "",
          });
          setLoading(false);
        } else {
          throw new Error("Invalid team data received");
        }
      })
      .catch((error) => {
        setError(error.message || "Failed to load team details");
        setLoading(false);
        console.error("Error loading team:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setError("Invalid team ID");
      return;
    }

    try {
      const response = await updateGroup(id, formData);
      if (response && !response.error) {
        navigate("/");
      } else {
        throw new Error(response.error || "Failed to update team");
      }
    } catch (error) {
      setError(error.message || "Failed to update team");
      console.error("Error updating team:", error);
    }
  };

  if (loading)
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">Loading team details...</div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-700">Error: {error}</div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Return to Teams List
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Team</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Team Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-150"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGroupForm;
