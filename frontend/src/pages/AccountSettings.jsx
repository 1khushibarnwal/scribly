import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";

const AccountSettings = () => {
  const { user, deleteAccount } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const isConfirmed = confirmText === "DELETE";

  const handleDelete = async () => {
    if (!isConfirmed) return;

    setDeleting(true);
    const result = await deleteAccount();
    setDeleting(false);

    if (result.success) {
      toast.success("Your account and all notes have been deleted");
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

          <div className="card bg-base-100 mb-6">
            <div className="card-body">
              <h2 className="card-title text-lg">Profile</h2>
              <p className="text-sm text-base-content/70">
                Name: <span className="text-base-content">{user?.name}</span>
              </p>
              <p className="text-sm text-base-content/70">
                Email: <span className="text-base-content">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border-2 border-error/40">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangleIcon className="size-5 text-error" />
                <h2 className="card-title text-error text-lg">Danger Zone</h2>
              </div>
              <p className="text-sm text-base-content/70 mb-4">
                Deleting your account is <strong>permanent</strong>. All of your
                notes will be erased along with your account, and this cannot be
                undone.
              </p>

              <label className="label">
                <span className="label-text">
                  Type <strong>DELETE</strong> to confirm
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered input-error w-full mb-4"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
              />

              <button
                className="btn btn-error w-fit"
                disabled={!isConfirmed || deleting}
                onClick={handleDelete}
              >
                <Trash2Icon className="size-4" />
                {deleting ? "Deleting..." : "Permanently Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
