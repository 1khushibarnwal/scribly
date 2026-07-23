import { ArrowLeftIcon } from "lucide-react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";
import ImagePicker from "../components/ImagePicker";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setLoading(true);
    try {
      const res = await api.post("/notes", { title, content, tags });
      const noteId = res.data._id;

      // Upload any selected images now that the note exists
      for (const file of images) {
        const formData = new FormData();
        formData.append("image", file);
        try {
          await api.post(`/notes/${noteId}/images`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch (imgError) {
          console.log("Error uploading image", imgError);
          toast.error(`Failed to upload one of the images`);
        }
      }

      toast.success("Note created successfully!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast.", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to create note :(",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-3 sm:px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/dashboard"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes Page
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
                  <label className="label">
                    <span className="label-text">Images (optional)</span>
                  </label>
                  <ImagePicker files={images} setFiles={setImages} />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
