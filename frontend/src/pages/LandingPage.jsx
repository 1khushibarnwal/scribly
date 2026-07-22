import { Link } from "react-router";
import {
  NotebookPenIcon,
  ShieldCheckIcon,
  ZapIcon,
  SparklesIcon,
  UserPlusIcon,
  PenLineIcon,
  FolderCheckIcon,
} from "lucide-react";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-primary font-mono tracking-tight mb-6">
          Scribly
        </h1>
        <p className="text-xl text-base-content/80 max-w-2xl mx-auto mb-10">
          A fast, no-fuss place to capture your thoughts. Sign up, write a note
          in seconds, and pick up right where you left off — from anywhere.
        </p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <Link to="/signup" className="btn btn-primary btn-md sm:btn-lg">
            Get Started
          </Link>
          <Link
            to="/login"
            className="btn btn-outline btn-primary btn-md sm:btn-lg"
          >
            Log In
          </Link>
        </div>
        <p className="text-sm text-base-content/50">
          Free to use. No credit card required.
        </p>
      </div>

      {/* Feature cards */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
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

      {/* How it works */}
      <div className="bg-base-300 border-y border-base-content/10">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <UserPlusIcon className="size-7 text-primary" />
              </div>
              <h3 className="font-bold mb-2">1. Create an account</h3>
              <p className="text-sm text-base-content/70">
                Sign up in seconds with just your name, email, and a password.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <PenLineIcon className="size-7 text-primary" />
              </div>
              <h3 className="font-bold mb-2">2. Write freely</h3>
              <p className="text-sm text-base-content/70">
                Start a note whenever inspiration strikes — no structure
                required.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
                <FolderCheckIcon className="size-7 text-primary" />
              </div>
              <h3 className="font-bold mb-2">3. Find it later</h3>
              <p className="text-sm text-base-content/70">
                Everything's saved to your account, ready whenever you come
                back.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI highlight */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="card bg-base-100 border-2 border-primary/30 p-8 text-center">
          <SparklesIcon className="size-8 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-3">
            Let AI do the re-reading for you
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Long note? One click summarizes it into a few clear sentences, so
            you can skim your own thoughts just as easily as you wrote them.
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start writing?</h2>
        <Link to="/signup" className="btn btn-primary btn-md sm:btn-lg">
          Create your free account
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-base-content/10 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-base-content/50">
          © {new Date().getFullYear()} Scribly. Built for people who just want
          to write things down.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
