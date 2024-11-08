import HomePageContent from "../pages/HomePageContent";

export const WorkerViews = () => {
  return (
    <div className="worker-dashboard">
      <h2>Worker Dashboard</h2>
      <HomePageContent filterByCurrentWorker={true} />
      {/* Limited features for workers */}
    </div>
  );
};
