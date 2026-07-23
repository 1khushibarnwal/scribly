import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import jsPDF from "jspdf";
import {
  ArrowLeftIcon,
  LoaderIcon,
  Trash2Icon,
  SparklesIcon,
  PinIcon,
  Share2Icon,
  DownloadIcon,
  FileTextIcon,
  ImagePlusIcon,
  XIcon,
} from "lucide-react";
import NavBar from "../components/NavBar";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [activeTab, setActiveTab] = useState("write"); // "write" | "preview"
  const [uploadingImage, setUploadingImage] = useState(false);

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

  useEffect(() => {
    if (activeTab === "write" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [note?.content, activeTab]);

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

  const handleToggleShare = async () => {
    setSharing(true);
    try {
      const res = await api.patch(`/notes/${id}/share`);
      setNote(res.data);

      if (res.data.shareToken) {
        const url = `${window.location.origin}/public/${res.data.shareToken}`;
        await navigator.clipboard.writeText(url);
        toast.success("Share link copied to clipboard!");
      } else {
        toast.success("Sharing disabled for this note");
      }
    } catch (error) {
      console.log("Error toggling share", error);
      toast.error("Failed to update sharing");
    } finally {
      setSharing(false);
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

  const handleExportTxt = () => {
    const blob = new Blob([`${note.title}\n\n${note.content}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${note.title || "note"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(note.title, 15, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(note.content, 180);
    doc.text(lines, 15, 32);
    doc.save(`${note.title || "note"}.pdf`);
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post(`/notes/${id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNote(res.data);
      toast.success("Image added");
    } catch (error) {
      console.log("Error uploading image", error);
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (publicId) => {
    try {
      const res = await api.delete(
        `/notes/${id}/images/${encodeURIComponent(publicId)}`,
      );
      setNote(res.data);
      toast.success("Image removed");
    } catch (error) {
      console.log("Error deleting image", error);
      toast.error("Failed to delete image");
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
      <div className="container mx-auto px-3 sm:px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <Link to="/dashboard" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleTogglePin}
                disabled={pinning}
                className={`btn btn-outline btn-sm ${note.pinned ? "btn-primary" : ""}`}
              >
                <PinIcon
                  className="h-4 w-4"
                  fill={note.pinned ? "currentColor" : "none"}
                />
                {note.pinned ? "Pinned" : "Pin"}
              </button>
              <button
                onClick={handleToggleShare}
                disabled={sharing}
                className={`btn btn-outline btn-sm ${note.shareToken ? "btn-primary" : ""}`}
              >
                <Share2Icon className="h-4 w-4" />
                {note.shareToken ? "Shared" : "Share"}
              </button>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-outline btn-sm"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Export
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-40 p-2 shadow-lg mt-2"
                >
                  <li>
                    <button onClick={handleExportTxt}>
                      <FileTextIcon className="size-4" />
                      As .txt
                    </button>
                  </li>
                  <li>
                    <button onClick={handleExportPdf}>
                      <FileTextIcon className="size-4" />
                      As PDF
                    </button>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline btn-sm"
              >
                <Trash2Icon className="h-4 w-4" />
                Delete
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
                <div className="flex items-center justify-between">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <div className="tabs tabs-boxed tabs-xs">
                    <button
                      type="button"
                      className={`tab ${activeTab === "write" ? "tab-active" : ""}`}
                      onClick={() => setActiveTab("write")}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      className={`tab ${activeTab === "preview" ? "tab-active" : ""}`}
                      onClick={() => setActiveTab("preview")}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {activeTab === "write" ? (
                  <textarea
                    ref={textareaRef}
                    placeholder="Write your note here... (Markdown supported)"
                    className="textarea textarea-bordered resize-none overflow-hidden min-h-32"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                ) : (
                  <div className="border border-base-300 rounded-lg p-4 min-h-32 prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {note.content || "*Nothing to preview yet*"}
                    </ReactMarkdown>
                  </div>
                )}
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
                <label className="label">
                  <span className="label-text">Images</span>
                </label>

                <div className="flex flex-wrap gap-3 mb-3">
                  {note.images?.map((img) => (
                    <div key={img.publicId} className="relative">
                      <img
                        src={img.url}
                        alt="Note attachment"
                        className="size-20 object-cover rounded-lg border border-base-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.publicId)}
                        className="absolute -top-2 -right-2 bg-error text-error-content rounded-full size-5 flex items-center justify-center"
                      >
                        <XIcon className="size-3" />
                      </button>
                    </div>
                  ))}

                  {(note.images?.length || 0) < 5 && (
                    <label className="size-20 rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center text-base-content/50 hover:border-primary hover:text-primary cursor-pointer">
                      <ImagePlusIcon className="size-6" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAddImage}
                        disabled={uploadingImage}
                      />
                    </label>
                  )}
                </div>
                {uploadingImage && (
                  <p className="text-xs text-base-content/50">Uploading...</p>
                )}
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
