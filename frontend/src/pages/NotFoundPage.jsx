import { Link } from "react-router";
import NavBar from "../components/NavBar";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <svg
          viewBox="0 0 240 160"
          className="w-64 mb-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="120"
            y="90"
            textAnchor="middle"
            fontSize="72"
            fontWeight="bold"
            fill="currentColor"
            className="text-primary/20 font-mono"
          >
            404
          </text>
          <g
            className="animate-bounce"
            style={{ transformOrigin: "120px 130px" }}
          >
            <rect
              x="95"
              y="115"
              width="50"
              height="36"
              rx="4"
              fill="currentColor"
              className="text-base-content/10"
            />
            <path
              d="M95 123 L120 138 L145 123"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            />
          </g>
        </svg>

        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-base-content/70 max-w-sm mb-6">
          Whatever you were looking for isn't here — maybe it was deleted, or
          the link's just a little off.
        </p>
        <Link to="/" className="btn btn-primary">
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
