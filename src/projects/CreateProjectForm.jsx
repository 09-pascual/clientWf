import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/ProjectServices";
import { getAllClients } from "../services/ClientServices";
import { getAllGroups } from "../services/GroupServices";

export const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [project, setProject] = useState({
    client: "",
    name: "",
    status: "",
    start_date: "",
    end_date: "",
    expected_duration: "",
    projectgroup_set: [],
  });

  useEffect(() => {
    Promise.all([getAllClients(), getAllGroups()]).then(
      ([clientsData, groupsData]) => {
        setClients(clientsData);
        setGroups(groupsData);
        setLoading(false);
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      client: parseInt(project.client),
      name: project.name,
      status: project.status,
      start_date: project.start_date,
      end_date: project.end_date,
      expected_duration: parseInt(project.expected_duration),
      projectgroup_set: project.projectgroup_set,
    };

    createProject(newProject).then(() => {
      navigate("/");
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            value={project.client}
            onChange={(e) =>
              setProject({ ...project, client: parseInt(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.first_name} {client.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assigned Groups
          </label>
          <select
            multiple
            value={project.projectgroup_set}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) =>
                parseInt(option.value)
              );
              setProject({
                ...project,
                projectgroup_set: values,
              });
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
          <small className="text-gray-500">
            Hold Ctrl/Cmd to select multiple groups
          </small>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={project.start_date}
            onChange={(e) =>
              setProject({ ...project, start_date: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={project.end_date}
            onChange={(e) =>
              setProject({ ...project, end_date: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Duration (days)
          </label>
          <input
            type="number"
            value={project.expected_duration}
            onChange={(e) =>
              setProject({
                ...project,
                expected_duration: parseInt(e.target.value),
              })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Project
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
