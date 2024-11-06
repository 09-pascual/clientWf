import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { Home } from "../pages/Home.jsx";
import { AddClientForm } from "../clients/AddClientForm.jsx";
import { EditProjectForm } from "../projects/EditProjectForm.jsx";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
        <Route path="/addClientForm" element={<AddClientForm />} />
        <Route
          path="/editProjectForm/:projectId"
          element={<EditProjectForm />}
        />
      </Route>
    </Routes>
  );
};
