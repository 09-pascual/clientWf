import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authInfo = JSON.parse(localStorage.getItem("workflow_token"));
    if (authInfo) {
      setUserRole(authInfo.role);
    }
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Workflow Manager</h1>

      {/* Role-based content */}
      {userRole === "admin" && (
        <div className="admin-dashboard">
          <h2>Owner Dashboard</h2>
          {/* Add admin-specific content */}
        </div>
      )}

      {userRole === "worker" && (
        <div className="worker-dashboard">
          <h2>Worker Dashboard</h2>
          {/* Add worker-specific content */}
        </div>
      )}

      {userRole === "client" && (
        <div className="client-dashboard">
          <h2>Client Dashboard</h2>
        </div>
      )}
    </div>
  );
};
