import { useEffect, useState } from "react";
import {
  LogOut,
  PlusIcon,
  Settings,
  ChevronDownIcon,
  Github,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/useAuth";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it works" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "FAQ" },
];

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!isLandingPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }, // triggers when a section is roughly centered in the viewport
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLandingPage]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="bg-base-300 border-b border-base-content/10 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <Link to={"/"} className="shrink-0">
            <h1 className="text-xl sm:text-3xl font-bold text-primary font-mono tracking-tight">
              Scribly
            </h1>
          </Link>

          {isLandingPage && (
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={
                    activeSection === section.id
                      ? "text-primary font-medium"
                      : "text-base-content/70 hover:text-primary"
                  }
                >
                  {section.label}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-1 sm:gap-3">
            <a
              href="https://github.com/1khushibarnwal/Scribly"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
              title="View source on GitHub"
            >
              <Github className="size-4 sm:size-5" />
            </a>

            <ThemeToggle />

            {user ? (
              <>
                <Link
                  to={"/create"}
                  className="btn btn-primary btn-sm sm:btn-md"
                  title="New Note"
                >
                  <PlusIcon className="size-4 sm:size-5" />
                  <span className="hidden sm:inline">New Note</span>
                </Link>

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-sm sm:btn-md gap-1 sm:gap-2 normal-case px-2"
                  >
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-7 sm:w-8">
                        <span className="text-xs sm:text-sm font-bold">
                          {initial}
                        </span>
                      </div>
                    </div>
                    <span className="hidden md:inline">{user.name}</span>
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
                <Link
                  to={"/login"}
                  className="btn btn-outline btn-primary btn-sm sm:btn-md"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="btn btn-primary btn-sm sm:btn-md shadow-md"
                >
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
