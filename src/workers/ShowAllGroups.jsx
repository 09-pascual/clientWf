import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllGroups } from "../services/GroupServices";

export const ShowAllGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllGroups()
      .then((data) => {
        setGroups(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load groups");
        setLoading(false);
        console.error("Error loading groups:", error);
      });
  }, []);

  if (loading) return <div>Loading groups...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">All Teams</h1>
        <Link
          to="/addGroupForm"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150"
        >
          Add New Team
        </Link>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {group.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {group.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Team Members
                  </h3>
                  {group.groupworker_set?.length > 0 ? (
                    <div className="space-y-2">
                      {group.groupworker_set.map((gw) => (
                        <div
                          key={gw.id}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div>
                            <p className="font-medium">
                              {gw.worker.user.first_name}{" "}
                              {gw.worker.user.last_name} "
                              {gw.worker.user.nickname}"
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              gw.worker.availability_status === "available"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {gw.worker.availability_status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No members assigned</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Current Projects
                  </h3>
                  {group.projectgroup_set?.length > 0 ? (
                    <div className="space-y-2">
                      {group.projectgroup_set.map((pg) => (
                        <div key={pg.id} className="p-2 bg-gray-50 rounded">
                          <p className="font-medium">{pg.project.name}</p>
                          <p className="text-sm text-gray-600">
                            Status: {pg.project.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No active projects</p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <Link
                    to={`/editGroupForm/${group.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-150"
                  >
                    Edit Team
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No teams available.</p>
          <Link
            to="/addGroupForm"
            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first team
          </Link>
        </div>
      )}
    </div>
  );
};
