import { Link } from "react-router";
import {
  ShieldCheckIcon,
  DatabaseIcon,
  LockIcon,
  Share2Icon,
  UsersIcon,
  Trash2Icon,
  CookieIcon,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const services = [
  { name: "MongoDB Atlas", desc: "stores your account and note data" },
  { name: "Cloudinary", desc: "stores images you attach to notes" },
  {
    name: "Groq",
    desc: 'processes a note\'s title and content only when you click "Summarize with AI" on that note; nothing is sent automatically',
  },
  {
    name: "Resend",
    desc: "sends password-reset emails to the email address on your account",
  },
  {
    name: "Upstash",
    desc: "used for rate limiting to prevent abuse; does not store personal data",
  },
];

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <NavBar />

      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-base-content/10">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
            <ShieldCheckIcon className="size-9 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg text-base-content/70">
            A plain-language explanation of what data Scribly collects and how
            it's used.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-16 w-full space-y-6">
        {/* What data */}
        <div className="card bg-base-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <DatabaseIcon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">What data is collected</h2>
          </div>
          <ul className="text-base-content/80 space-y-2 mb-3">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Your name and email address, provided when you sign up
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Your password, which is hashed before it's ever stored (see below)
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              The notes you write, including their title, content, and tags
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              Any images you choose to attach to a note
            </li>
          </ul>
          <p className="text-base-content/60 text-sm">
            No other personal data is requested or collected.
          </p>
        </div>

        {/* Password security */}
        <div className="card bg-base-100 p-6 border-2 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <LockIcon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">
              Your password is never visible — not even to us
            </h2>
          </div>
          <p className="text-base-content/80 leading-relaxed">
            Passwords are hashed using bcrypt before being saved. Hashing is a
            one-way process — there is no way to reverse a hash back into the
            original password, by us or by anyone with access to the database.
            When you log in, your entered password is re-hashed and compared to
            the stored hash; the original password itself is never stored
            anywhere.
          </p>
        </div>

        {/* Third parties */}
        <div className="card bg-base-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Share2Icon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Third-party services used</h2>
          </div>
          <p className="text-base-content/80 mb-4">
            Scribly relies on the following third-party services to operate.
            Each only receives the specific data needed for its function:
          </p>
          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s.name}
                className="bg-base-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2"
              >
                <span className="font-semibold text-primary shrink-0">
                  {s.name}
                </span>
                <span className="text-sm text-base-content/70">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who sees notes */}
        <div className="card bg-base-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <UsersIcon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Who can see your notes</h2>
          </div>
          <p className="text-base-content/80 leading-relaxed">
            Your notes are private by default and tied only to your account. The
            only way a note becomes visible to anyone else is if you explicitly
            enable sharing on that specific note, which generates a public
            read-only link — the note stays private until you choose to do this.
          </p>
        </div>

        {/* Admin */}
        <div className="card bg-base-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <ShieldCheckIcon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Site administration</h2>
          </div>
          <p className="text-base-content/80 leading-relaxed">
            The site administrator can view basic account information (name,
            email, and account creation date) and aggregate usage statistics
            (such as total number of users and notes) for the purpose of
            maintaining the app. The administrator cannot view your password or
            the content of your notes.
          </p>
        </div>

        {/* Your control */}
        <div className="card bg-base-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Trash2Icon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Your control over your data</h2>
          </div>
          <p className="text-base-content/80 leading-relaxed">
            You can edit your profile or change your password at any time from
            Account Settings. You can permanently delete your account at any
            time, which immediately and irreversibly deletes your account and
            every note associated with it.
          </p>
        </div>

        {/* Cookies */}
        <div className="card bg-base-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 rounded-full p-2">
              <CookieIcon className="size-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Cookies</h2>
          </div>
          <p className="text-base-content/80 leading-relaxed">
            Scribly uses a single essential cookie to keep you logged in between
            visits. This cookie is required for the app to function and is not
            used for tracking or advertising.
          </p>
        </div>

        {/* Questions */}
        <div className="card bg-primary/5 border border-primary/20 p-6 text-center">
          <p className="text-base-content/80">
            See the{" "}
            <Link to="/about" className="link link-primary font-medium">
              About page
            </Link>{" "}
            for more on what Scribly is and how it's built.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
