import { useEffect, useState } from "react";
import { OwnerViews } from "../components/OwnerViews";
import { WorkerViews } from "../components/WorkerView";
import { HomePageContent } from "./HomePageContent";

export const Home = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const authInfo = JSON.parse(localStorage.getItem("workflow_token"));
    if (authInfo) {
      setUserRole(authInfo.role);
    }
  }, []);

  const renderContent = () => {
    switch (userRole) {
      case "admin":
        return <OwnerViews />;
      case "worker":
        return <WorkerViews />;
      case "client":
        return (
          <div className="client-dashboard">
            <h2>Client Dashboard</h2>
            {/* Client specific content */}
          </div>
        );
      default:
        return <HomePageContent />; // Your default homepage content
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Workflow Manager</h1>
      {renderContent()}
    </div>
  );
};
