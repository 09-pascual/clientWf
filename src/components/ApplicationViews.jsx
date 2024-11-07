import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Home } from "../pages/Home.jsx";
import { AddClientForm } from "../clients/AddClientForm.jsx";
import { EditProjectForm } from "../projects/EditProjectForm.jsx";
import ShowAllProjectsView from "../projects/ShowAllProjectsView.jsx";
import ShowAllClients from "../clients/ShowAllClients.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ShowAllClients />} />
        <Route path="/addClientForm" element={<AddClientForm />} />
        <Route
          path="/editProjectForm/:projectId"
          element={<EditProjectForm />}
        />
        <Route path="/projects" element={<ShowAllProjectsView />} />
      </Route>
    </Routes>
  );
};
