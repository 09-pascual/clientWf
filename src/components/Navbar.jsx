import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("workflow_token"))?.role;

  return (
    <nav className="bg-gradient-to-r from-white to-slate-50 shadow-md border-b border-slate-100">
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 pt-4">
          WorkFlow Manager
        </h1>
        <ul className="flex justify-center items-center space-x-12 py-6 px-4 w-full">
          {localStorage.getItem("workflow_token") && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-slate-600 hover:text-blue-600 font-medium"
                    }`
                  }
                  to="/projects"
                >
                  Projects
                </NavLink>
              </li>

              {userRole === "admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `text-lg transition-all duration-200 ${
                        isActive
                          ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                          : "text-slate-600 hover:text-blue-600 font-medium"
                      }`
                    }
                    to="/workers"
                  >
                    Workers
                  </NavLink>
                </li>
              )}

              {userRole === "admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `text-lg transition-all duration-200 ${
                        isActive
                          ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                          : "text-slate-600 hover:text-blue-600 font-medium"
                      }`
                    }
                    to="/clients"
                  >
                    Clients
                  </NavLink>
                </li>
              )}

              {userRole === "admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `text-lg transition-all duration-200 ${
                        isActive
                          ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                          : "text-slate-600 hover:text-blue-600 font-medium"
                      }`
                    }
                    to="/groups"
                  >
                    Groups
                  </NavLink>
                </li>
              )}

              <li>
                <button
                  className="text-lg text-slate-600 hover:text-red-600 font-medium transition-colors duration-200"
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
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-slate-600 hover:text-blue-600 font-medium"
                    }`
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `text-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                        : "text-slate-600 hover:text-blue-600 font-medium"
                    }`
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
