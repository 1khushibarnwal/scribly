import { LogOut, PlusIcon } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="test-7xl font-bold text-primary font-mono tracking-tight">
            Scribly
          </h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <span className="text-sm opacity-70 hidden sm:inline">
                  {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-ghost">
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-ghost">
                  Login
                </Link>
                <Link to={"/signup"} className="btn btn-primary">
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
