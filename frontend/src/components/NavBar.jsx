import { LogOut, PlusIcon, Settings, ChevronDownIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <h1 className="test-7xl font-bold text-primary font-mono tracking-tight">
              Scribly
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost gap-2 normal-case"
                  >
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-8">
                        <span className="text-sm font-bold">{initial}</span>
                      </div>
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                    <ChevronDownIcon className="size-4" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-lg mt-2"
                  >
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/settings">
                        <Settings className="size-4" />
                        Account Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="text-error">
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-outline btn-primary">
                  Login
                </Link>
                <Link to={"/signup"} className="btn btn-primary shadow-md">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
