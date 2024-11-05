import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("workflow_token"))?.role;

  return (
    <ul className="navbar pb-10">
      {localStorage.getItem("workflow_token") && (
        <>
          <li className="navbar__item pl-10">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/projects"}
            >
              Projects
            </NavLink>
          </li>

          {userRole === "admin" && (
            <li className="navbar__item">
              <NavLink
                className="text-left underline text-blue-600 hover:text-purple-700"
                to={"/workers"}
              >
                Workers
              </NavLink>
            </li>
          )}

          {userRole === "admin" && (
            <li className="navbar__item">
              <NavLink
                className="text-left underline text-blue-600 hover:text-purple-700"
                to={"/clients"}
              >
                Clients
              </NavLink>
            </li>
          )}

          {}
          {userRole === "admin" && (
            <li className="navbar__item">
              <NavLink
                className="text-left underline text-blue-600 hover:text-purple-700"
                to={"/groups"}
              >
                Groups
              </NavLink>
            </li>
          )}

          {/* Logout */}
          <li className="navbar__item">
            <button
              className="underline text-blue-600 hover:text-purple-700"
              onClick={() => {
                localStorage.removeItem("workflow_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </>
      )}
      {!localStorage.getItem("workflow_token") && (
        <>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              className="text-left underline text-blue-600 hover:text-purple-700"
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
