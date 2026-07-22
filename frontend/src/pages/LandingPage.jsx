import { Link } from "react-router";
import { NotebookPenIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-primary font-mono tracking-tight mb-6">
          Scribly
        </h1>
        <p className="text-xl text-base-content/80 max-w-2xl mx-auto mb-10">
          A fast, no-fuss place to capture your thoughts. Sign up, write a note
          in seconds, and pick up right where you left off — from anywhere.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-ghost btn-lg">
            Log In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="card bg-base-100 p-6">
            <NotebookPenIcon className="size-8 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">Quick capture</h3>
            <p className="text-sm text-base-content/70">
              Jot down a note the moment an idea hits — no clutter, no setup.
            </p>
          </div>
          <div className="card bg-base-100 p-6">
            <ShieldCheckIcon className="size-8 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">Private by default</h3>
            <p className="text-sm text-base-content/70">
              Every note is tied to your account only — nobody else can see it.
            </p>
          </div>
          <div className="card bg-base-100 p-6">
            <ZapIcon className="size-8 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">Fast and simple</h3>
            <p className="text-sm text-base-content/70">
              No folders, no tags to manage — just write, save, and find it
              later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
