import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllWorkers } from "../services/Workers";

export const ShowAllWorkersView = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllWorkers()
      .then((data) => {
        setWorkers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load workers");
        setLoading(false);
        console.error("Error loading workers:", error);
      });
  }, []);

  if (loading) return <div>Loading workers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Workers</h1>
      </div>

      {workers.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {worker.user.first_name} {worker.user.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Nickname: {worker.user.nickname}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium text-gray-900">
                      {worker.user.username}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">
                      {worker.availability_status}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      {worker.user.phone_number}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Assigned Projects</p>
                    {worker.projects?.length > 0 ? (
                      <div className="space-y-1">
                        {worker.projects.map((project) => (
                          <p
                            key={project.id}
                            className="font-medium text-gray-900"
                          >
                            {project.name}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No projects assigned directly
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <Link
                    to={`/editWorkerForm/${worker.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-150"
                  >
                    Edit Worker
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No workers available.</p>
        </div>
      )}
    </div>
  );
};
