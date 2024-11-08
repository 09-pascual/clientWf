import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../services/GroupServices";
import { getAllWorkers } from "../services/Workers";

export const CreateGroupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    workers: [],
  });

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        const workers = await getAllWorkers();
        setAvailableWorkers(workers);
      } catch (err) {
        console.error("Error loading workers:", err);
        setError("Failed to load available workers");
      }
    };

    loadWorkers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkerToggle = (worker) => {
    setFormData((prev) => {
      const isWorkerInTeam = prev.workers.some((w) => w.id === worker.id);

      if (isWorkerInTeam) {
        return {
          ...prev,
          workers: prev.workers.filter((w) => w.id !== worker.id),
        };
      } else {
        return {
          ...prev,
          workers: [...prev.workers, worker],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const submitData = {
        name: formData.name,
        description: formData.description,
        workers: formData.workers.map((w) => w.id),
      };

      const response = await createGroup(submitData);

      if (response && !response.error) {
        navigate("/");
      } else {
        throw new Error(response?.error || "Failed to create team");
      }
    } catch (err) {
      setError(err.message || "Failed to create team");
      console.error("Error creating team:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Team</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-700">{error}</div>
          </div>
        )}

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Team Members
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-4">
              {availableWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.workers.some((w) => w.id === worker.id)}
                      onChange={() => handleWorkerToggle(worker)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <span className="font-medium">
                        {worker.user.first_name} {worker.user.last_name}
                      </span>
                      {worker.user.nickname && (
                        <span className="text-gray-500 text-sm ml-1">
                          "{worker.user.nickname}"
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      worker.availability_status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {worker.availability_status}
                  </span>
                </div>
              ))}
              {availableWorkers.length === 0 && (
                <p className="text-gray-500 italic">No workers available</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-150 disabled:bg-blue-400"
            >
              {loading ? "Creating..." : "Create Team"}
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

export default CreateGroupForm;
