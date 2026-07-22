import { PenSquareIcon, Trash2Icon, SparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault(); // to prevent default navigation effect over the NoteDetailPage

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of deleted one from array
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note :(");
    }
  };

  const handleSummarize = async (e) => {
    e.preventDefault(); // don't navigate to detail page

    setSummarizing(true);
    try {
      const res = await api.post(`/notes/${note._id}/summarize`);
      setSummary(res.data.summary);
    } catch (error) {
      console.log("Error summarizing note", error);
      toast.error("Failed to summarize note");
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-2 border-[#00ff9d]/30 hover:border-[#00ff9d]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        {summarizing && (
          <p className="text-xs text-base-content/50 italic mt-2">
            Summarizing...
          </p>
        )}

        {summary && !summarizing && (
          <p className="text-xs italic text-base-content/60 border-l-2 border-primary pl-2 mt-2">
            {summary}
          </p>
        )}

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button
              className="btn btn-ghost btn-xs"
              onClick={handleSummarize}
              disabled={summarizing}
              title="Summarize with AI"
            >
              <SparklesIcon className="size-4" />
            </button>
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
