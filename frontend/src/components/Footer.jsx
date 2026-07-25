import { Link } from "react-router";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-base-content/10 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-primary font-mono">
                Scribly
              </h3>
              <p className="text-sm text-base-content/60 mt-1">
                A fast, no-fuss place to capture your thoughts.
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <Link to="/" className="link link-hover">
                Home
              </Link>
              <Link to="/login" className="link link-hover">
                Login
              </Link>
              <Link to="/signup" className="link link-hover">
                Sign up
              </Link>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/1khushibarnwal/Scribly"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-sm"
                title="View source on GitHub"
              >
                <Github className="size-4" />
              </a>

              <a
                href="mailto:barnwalkhushi12345@gmail.com"
                className="btn btn-ghost btn-circle btn-sm"
                title="Contact"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-base-content/10 pt-6 text-center text-sm text-base-content/50">
            © {new Date().getFullYear()} Scribly. Built for people who just want
            to write things down.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
