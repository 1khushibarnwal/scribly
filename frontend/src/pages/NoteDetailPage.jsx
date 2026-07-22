import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SparklesIcon,
  PinIcon,
} from "lucide-react";
import NavBar from "../components/NavBar";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setTagsInput((res.data.tags || []).join(", "));
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Auto-grow the textarea to fit its content, LinkedIn-post style
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [note?.content]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
        tags,
      });
      toast.success("Note updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error(error.response?.data?.message || "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePin = async () => {
    setPinning(true);
    try {
      const res = await api.patch(`/notes/${id}/pin`);
      setNote(res.data);
      toast.success(res.data.pinned ? "Note pinned" : "Note unpinned");
    } catch (error) {
      console.log("Error toggling pin", error);
      toast.error("Failed to update pin");
    } finally {
      setPinning(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    setSummary("");
    try {
      const res = await api.post(`/notes/${id}/summarize`);
      setSummary(res.data.summary);
    } catch (error) {
      console.log("Error summarizing note", error);
      toast.error("Failed to summarize note");
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/dashboard" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePin}
                disabled={pinning}
                className={`btn btn-outline ${note.pinned ? "btn-primary" : ""}`}
              >
                <PinIcon
                  className="h-5 w-5"
                  fill={note.pinned ? "currentColor" : "none"}
                />
                {note.pinned ? "Pinned" : "Pin"}
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline"
              >
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>
          </div>

          <div className="card bg-base-100 border-2 border-[#00ff9d]/30">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  ref={textareaRef}
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered resize-none overflow-hidden min-h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Tags (comma-separated)</span>
                </label>
                <input
                  type="text"
                  placeholder="work, ideas, urgent"
                  className="input input-bordered"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <button
                  type="button"
                  className="btn btn-outline btn-sm w-fit"
                  onClick={handleSummarize}
                  disabled={summarizing}
                >
                  <SparklesIcon className="size-4" />
                  {summarizing ? "Summarizing..." : "Summarize with AI"}
                </button>

                {summary && (
                  <div className="mt-3 p-4 bg-base-200 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Summary</p>
                    <p className="text-sm text-base-content/80">{summary}</p>
                  </div>
                )}
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
