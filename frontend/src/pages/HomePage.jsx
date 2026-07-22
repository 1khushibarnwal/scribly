import { useEffect, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (activeTag) params.tag = activeTag;

        const res = await api.get("/notes", { params });
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log(error);
        console.log("error fetching notes!");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes!");
        }
      } finally {
        setLoading(false);
      }
    };

    // Debounce so we don't fire a request on every keystroke
    const timeout = setTimeout(fetchNotes, 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, activeTag]);

  const hasFilters = searchTerm || activeTag;

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <label className="input input-bordered flex items-center gap-2 max-w-md w-full">
            <SearchIcon className="size-4 text-base-content/50" />
            <input
              type="text"
              className="grow"
              placeholder="Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          {activeTag && (
            <button
              className="badge badge-primary gap-1 py-3"
              onClick={() => setActiveTag("")}
            >
              {activeTag}
              <XIcon className="size-3" />
            </button>
          )}
        </div>

        {loading && (
          <div className="text-center text-primary py-10">loading notes...</div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && hasFilters && (
          <div className="text-center text-base-content/60 py-10">
            No notes match your search{activeTag ? ` in "${activeTag}"` : ""}.
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && !hasFilters && (
          <NotesNotFound />
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
                onTagClick={setActiveTag}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
