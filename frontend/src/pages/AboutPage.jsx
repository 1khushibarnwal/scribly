import { Link } from "react-router";
import {
  Github,
  NotebookPenIcon,
  SearchIcon,
  PinIcon,
  ImageIcon,
  FileTextIcon,
  SparklesIcon,
  Share2Icon,
  DownloadIcon,
  SunIcon,
  UserCogIcon,
  Trash2Icon,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const capabilities = [
  {
    icon: NotebookPenIcon,
    text: "Create, edit, and delete notes, all private to your account",
  },
  { icon: SearchIcon, text: "Search your notes and filter by tags" },
  { icon: PinIcon, text: "Pin important notes to the top of your dashboard" },
  { icon: ImageIcon, text: "Attach up to 5 images to any note" },
  { icon: FileTextIcon, text: "Write in Markdown and preview it rendered" },
  { icon: SparklesIcon, text: "Get a one-click AI summary of any note" },
  {
    icon: Share2Icon,
    text: "Generate a public, read-only share link for a note",
  },
  { icon: DownloadIcon, text: "Export any note as a .txt or .pdf file" },
  { icon: SunIcon, text: "Switch between light and dark themes" },
  {
    icon: UserCogIcon,
    text: "Edit your profile, change your password, or reset it by email",
  },
  {
    icon: Trash2Icon,
    text: "Permanently delete your account and all your data, at any time",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <NavBar />

      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-base-content/10">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
            <NotebookPenIcon className="size-9 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">About Scribly</h1>
          <p className="text-lg text-base-content/70">
            A fast, no-fuss place to capture your thoughts.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full">
        {/* What is it */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">What is Scribly?</h2>
          <div className="card bg-base-100 p-6">
            <p className="text-base-content/80 leading-relaxed">
              Scribly is a personal notes app. You sign up, write a note, and
              it's saved to your account — private by default, with no folders
              or setup required to get started. Every note you write can be
              edited, tagged, searched, pinned, and organized however you like.
            </p>
          </div>
        </section>

        {/* Capabilities grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">What can you do with it?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="card bg-base-100 p-4 flex-row items-center gap-3"
                >
                  <div className="bg-primary/10 rounded-full p-2 shrink-0">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <p className="text-sm text-base-content/80">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why built */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">Why was this built?</h2>
          <div className="card bg-base-100 p-6">
            <p className="text-base-content/80 leading-relaxed">
              Scribly is a personal project — built to learn and demonstrate
              full-stack development, covering authentication, database design,
              third-party integrations, and deployment, from the ground up.
            </p>
          </div>
        </section>

        {/* Source code */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">Source code</h2>
          <div className="card bg-base-100 p-6">
            <p className="text-base-content/80 mb-4 leading-relaxed">
              Scribly is open source. You're welcome to look through the code,
              see how it's built, or use it as a reference for your own
              projects.
            </p>
            <a
              href="https://github.com/1khushibarnwal/scribly"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-primary gap-2 w-fit"
            >
              <Github className="size-4" />
              View on GitHub
            </a>
          </div>
        </section>

        {/* Questions */}
        <section>
          <div className="card bg-primary/5 border border-primary/20 p-6 text-center">
            <p className="text-base-content/80">
              Have questions about your data? See our{" "}
              <Link to="/privacy" className="link link-primary font-medium">
                Privacy Policy
              </Link>{" "}
              for details on what's collected and how it's handled.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
