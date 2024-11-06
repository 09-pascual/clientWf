import { HomePageContent } from "../pages/HomePageContent";

export const OwnerViews = () => {
  return (
    <div className="admin-dashboard">
      <h2>Owner Dashboard</h2>
      <HomePageContent />
      {/* Additional admin-only features */}
    </div>
  );
};
