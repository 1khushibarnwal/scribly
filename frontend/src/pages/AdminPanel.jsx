import { useEffect, useState } from "react";
import { UsersIcon, FileTextIcon, ShieldAlertIcon } from "lucide-react";
import { Link } from "react-router";

import NavBar from "../components/NavBar";
import api from "../lib/axios";
import { useAuth } from "../context/useAuth";

const AdminPanel = () => {
  const { user, checkingSession } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    // Wait until the session-restore check has actually finished
    if (checkingSession) return;

    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        if (error.response?.status === 403) {
          setForbidden(true);
        }
        console.log("Admin stats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [checkingSession]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200">
        <NavBar />
        <div className="flex items-center justify-center py-24">
          <p className="text-base-content/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
          <svg
            viewBox="0 0 200 200"
            className="size-40 mb-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="currentColor"
              className="text-error/10"
            />
            <path
              d="M100 40 L150 60 V100 C150 130 128 155 100 165 C72 155 50 130 50 100 V60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-error"
            />
            <path
              d="M80 100 L94 114 L124 84"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-base-content/20"
            />
            <line
              x1="65"
              y1="65"
              x2="135"
              y2="135"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              className="text-error animate-pulse"
            />
          </svg>

          <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
          <p className="text-base-content/70 max-w-sm mb-6">
            This area is reserved for the site administrator. If you believe
            this is a mistake, there's nothing to see here either way.
          </p>
          <Link to="/dashboard" className="btn btn-primary">
            Back to your notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

          {stats ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-base-100 p-6">
                <UsersIcon className="size-6 text-primary mb-2" />
                <p className="text-sm text-base-content/60">Total Users</p>
                <p className="text-3xl font-bold">{stats.userCount}</p>
              </div>
              <div className="card bg-base-100 p-6">
                <FileTextIcon className="size-6 text-primary mb-2" />
                <p className="text-sm text-base-content/60">Total Notes</p>
                <p className="text-3xl font-bold">{stats.noteCount}</p>
              </div>
            </div>
          ) : (
            <p className="text-error">Unable to load stats.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
