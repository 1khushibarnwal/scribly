import { useEffect, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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

      <div className="max-w-7xl mx-auto p-3 sm:p-4 mt-6">
        {/* Search + active tag */}
        <motion.div
          className="flex flex-wrap items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
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

          <AnimatePresence>
            {activeTag && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                transition={{ duration: 0.2 }}
                className="badge badge-primary gap-1 py-3"
                onClick={() => setActiveTag("")}
              >
                {activeTag}

                <XIcon className="size-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <motion.div
            className="text-center text-primary py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            loading notes...
          </motion.div>
        )}

        {/* No search results */}
        <AnimatePresence mode="wait">
          {!loading && notes.length === 0 && !isRateLimited && hasFilters && (
            <motion.div
              key="no-results"
              className="text-center text-base-content/60 py-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              No notes match your search
              {activeTag ? ` in "${activeTag}"` : ""}.
            </motion.div>
          )}
        </AnimatePresence>

        {/* No notes at all */}
        {!loading && notes.length === 0 && !isRateLimited && !hasFilters && (
          <NotesNotFound />
        )}

        {/* Notes */}
        {!loading && notes.length > 0 && !isRateLimited && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {notes.map((note) => (
                <motion.div
                  key={note._id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    y: -10,
                  }}
                  transition={{
                    layout: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 0.25,
                    },
                    scale: {
                      duration: 0.25,
                    },
                    y: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                >
                  <NoteCard
                    note={note}
                    setNotes={setNotes}
                    onTagClick={setActiveTag}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
