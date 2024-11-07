import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/ProjectServices";

export const ShowAllProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        const sortedProjects = data.sort((a, b) => {
          const statusOrder = { open: 0, upcoming: 1, closed: 2 }; // Changed to match your status values
          const statusDiff = statusOrder[a.status] - statusOrder[b.status];

          if (a.status === "closed" && b.status === "closed") {
            return new Date(b.start_date) - new Date(a.start_date);
          }

          return statusDiff;
        });

        setProjects(sortedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((project) =>
    statusFilter === "all" ? true : project.status === statusFilter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium text-gray-600">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">All Projects</h2>
        <div className="flex items-center gap-3">
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Sort By</option>
            <option value="open">Open</option>
            <option value="upcoming">Upcoming</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {project.name} {/* Changed from project_name */}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "open"
                        ? "bg-green-100 text-green-800"
                        : project.status === "upcoming"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium text-gray-900">
                      {project.client.first_name} {project.client.last_name}{" "}
                      {/* Changed from clientId */}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Assigned Teams</p>
                    {project.projectgroup_set?.length > 0 ? (
                      <div className="space-y-1">
                        {project.projectgroup_set.map((pg) => (
                          <p key={pg.id} className="font-medium text-gray-900">
                            {pg.group.name}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No teams assigned
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(project.start_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(project.end_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Expected Duration</p>
                    <p className="font-medium text-gray-900">
                      {project.expected_duration} days
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/editProjectForm/${project.id}`)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-150"
                  >
                    Edit Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            {statusFilter === "all"
              ? "No projects available."
              : `No ${statusFilter} projects available.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowAllProjectsView;
