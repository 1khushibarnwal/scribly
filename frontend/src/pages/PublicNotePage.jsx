import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoaderIcon } from "lucide-react";

import api from "../lib/axios";
import NavBar from "../components/NavBar";
import { formatDate } from "../lib/utils";

const PublicNotePage = () => {
  const { token } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/public/notes/${token}`);
        setNote(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "This shared note is unavailable",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200">
        <NavBar />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-base-content/70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="card bg-base-100 border-2 border-[#00ff9d]/30">
            <div className="card-body">
              <h1 className="text-2xl font-bold mb-1">{note.title}</h1>
              <p className="text-sm text-base-content/50 mb-4">
                Shared by {note.authorName} ·{" "}
                {formatDate(new Date(note.createdAt))}
              </p>

              {note.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {note.tags.map((tag) => (
                    <span key={tag} className="badge badge-outline badge-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {note.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNotePage;
