import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";

const AccountSettings = () => {
  const { user, deleteAccount, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const isConfirmed = confirmText === "DELETE";

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const result = await updateProfile({ name });
    setSavingProfile(false);

    if (result.success) {
      toast.success("Profile updated");
    } else {
      toast.error(result.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }

    setChangingPassword(true);
    const result = await changePassword({ currentPassword, newPassword });
    setChangingPassword(false);

    if (result.success) {
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      toast.error(result.message);
    }
  };

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

          {/* Profile */}
          <div className="card bg-base-100 mb-6">
            <div className="card-body">
              <h2 className="card-title text-lg">Profile</h2>
              <form onSubmit={handleProfileSave}>
                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={user?.email}
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/50">
                      Email cannot be changed
                    </span>
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={savingProfile}
                >
                  {savingProfile ? "Saving..." : "Save Profile"}
                </button>
              </form>
            </div>
          </div>

          {/* Change password */}
          <div className="card bg-base-100 mb-6">
            <div className="card-body">
              <h2 className="card-title text-lg">Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">Current password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">New password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Confirm new password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={changingPassword}
                >
                  {changingPassword ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>

          {/* Danger zone */}
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
