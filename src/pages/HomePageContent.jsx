// pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/ProjectServices";
import { getWorkerProjects } from "../services/Workers";

export const Home = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const authInfo = JSON.parse(localStorage.getItem("workflow_token"));
    if (authInfo) {
      setUserRole(authInfo.role);
    }
  }, []);

  // If worker, show WorkerHomeContent, else show admin content
  return userRole === "worker" ? (
    <HomePageContent isWorker={true} />
  ) : (
    <HomePageContent isWorker={false} />
  );
};

export const HomePageContent = ({ isWorker }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("workflow_token"))?.role;

  useEffect(() => {
    // Use appropriate service based on user role
    const projectService = isWorker ? getWorkerProjects : getAllProjects;

    projectService()
      .then((data) => {
        const filteredAndSortedProjects = data
          .filter((project) => project.status !== "closed")
          .sort((a, b) => {
            const statusOrder = { open: 0, upcoming: 1 };
            return statusOrder[a.status] - statusOrder[b.status];
          });
        setProjects(filteredAndSortedProjects);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isWorker]);

  // Rest of your component stays exactly the same...
  // ... all the JSX and ProjectCard component remain unchanged

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  const openProjects = projects.filter((project) => project.status === "open");
  const upcomingProjects = projects.filter(
    (project) => project.status === "upcoming"
  );

  return (
    <main className="text-slate-900 pl-10 pr-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl">Current Projects</h1>
        {/* Only show Add Client button for admins */}
        {userRole === "admin" && (
          <button
            onClick={() => navigate("/clients/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Client
          </button>
        )}
      </div>

      <div className="space-y-8">
        {openProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Open Projects
            </h2>
            <div className="grid gap-6">
              {openProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  navigate={navigate}
                  userRole={userRole}
                />
              ))}
            </div>
          </div>
        )}

        {upcomingProjects.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-yellow-700">
              Upcoming Projects
            </h2>
            <div className="grid gap-6">
              {upcomingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  navigate={navigate}
                  userRole={userRole}
                />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              No active or upcoming projects available
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

const ProjectCard = ({ project, navigate, userRole }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">{project.name}</h2>
        {userRole === "admin" && (
          <button
            onClick={() => navigate(`/projects/${project.id}/edit`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-1 px-3 rounded"
          >
            Edit
          </button>
        )}
      </div>
      <span
        className={`px-3 py-1 rounded-full text-sm ${
          project.status === "open"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {project.status}
      </span>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div>
        <h3 className="font-semibold text-gray-700">Client Details</h3>
        <p>
          Name: {project.client.first_name} {project.client.last_name}
        </p>
        <p>Address: {project.client.address}</p>
        <p>Email: {project.client.email}</p>
        <p>Phone: {project.client.phone_number}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700">Project Groups</h3>
        {project.projectgroup_set?.length > 0 ? (
          <div>
            {project.projectgroup_set.map((pg) => (
              <div key={pg.id} className="mb-2">
                {" "}
                {/* Added margin-bottom for spacing between groups */}
                <p className="font-medium">{pg.group?.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {pg.group?.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No groups assigned</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-700">Project Timeline</h3>
        <p>Start: {new Date(project.start_date).toLocaleDateString()}</p>
        <p>End: {new Date(project.end_date).toLocaleDateString()}</p>
        <p>Duration: {project.expected_duration} days</p>
      </div>
    </div>
  </div>
);

export default HomePageContent;
