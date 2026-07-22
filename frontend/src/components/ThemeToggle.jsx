import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("scribly-theme") || "forest",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("scribly-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "forest" ? "scribly_light" : "forest"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      title={
        theme === "forest" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "forest" ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
