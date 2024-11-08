import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Home } from "../pages/Home.jsx";
import { AddClientForm } from "../clients/AddClientForm.jsx";
import { EditProjectForm } from "../projects/EditProjectForm.jsx";
import ShowAllProjectsView from "../projects/ShowAllProjectsView.jsx";
import ShowAllClients from "../clients/ShowAllClients.jsx";
import { ShowAllWorkersView } from "../workers/ShowAllWorkers.jsx";
import { ShowAllGroups } from "../workers/ShowAllGroups.jsx";
import { CreateWorkerForm } from "../workers/CreateWorkerForm.jsx";
import { CreateProjectForm } from "../projects/CreateProjectForm.jsx";
import { EditWorkerForm } from "../workers/EditWorkerForm.jsx";
import { EditGroupForm } from "../workers/EditGroupForm.jsx";
import { EditClientForm } from "../clients/EditClientForm.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Authorized />}>
        <Route path="/home" element={<Home />} />
        <Route path="/clients" element={<ShowAllClients />} />
        <Route path="/addClientForm" element={<AddClientForm />} />
        <Route path="/editClientForm/:clientId" element={<EditClientForm />} />

        <Route path="/workers" element={<ShowAllWorkersView />} />
        <Route path="/createWorkerForm" element={<CreateWorkerForm />} />
        <Route path="/editWorkerForm/:workerId" element={<EditWorkerForm />} />

        <Route path="/groups" element={<ShowAllGroups />} />
        <Route path="/editGroupForm/:groupId" element={<EditGroupForm />} />

        <Route path="/projects" element={<ShowAllProjectsView />} />
        <Route path="/createProjectForm" element={<CreateProjectForm />} />
        <Route
          path="/editProjectForm/:projectId"
          element={<EditProjectForm />}
        />
      </Route>
    </Routes>
  );
};
