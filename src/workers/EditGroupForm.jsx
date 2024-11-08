import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getGroupById, updateGroup } from "../services/GroupServices";
import { getAllWorkers } from "../services/Workers";

export const EditGroupForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState({
    name: "",
    description: "",
    workers: [],
  });
  const [allWorkers, setAllWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGroupById(id)
      .then((data) => {
        setGroup({
          name: data.name,
          description: data.description,
          workers: data.groupworker_set.map((gw) => gw.worker.id),
        });
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load group");
        setLoading(false);
        console.error("Error loading group:", error);
      });

    getAllWorkers()
      .then((data) => {
        setAllWorkers(data);
      })
      .catch((error) => {
        setError("Failed to load workers");
        console.error("Error loading workers:", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleWorkerSelect = (e) => {
    const selectedWorkerIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setGroup({ ...group, workers: selectedWorkerIds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGroup(id, group)
      .then(() => {
        navigate("/groups");
      })
      .catch((error) => {
        setError("Failed to update group");
        console.error("Error updating group:", error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Group</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={group.name}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={group.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="workers"
            className="block font-medium text-gray-700 mb-2"
          >
            Team Members
          </label>
          <select
            id="workers"
            name="workers"
            multiple
            value={group.workers}
            onChange={handleWorkerSelect}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {allWorkers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.user.first_name} {worker.user.last_name} ("
                {worker.user.nickname}")
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <Link
            to="/groups"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded mr-2"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
