import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setLoading(true);
    const result = await resetPassword({ token, password });
    setLoading(false);

    if (result.success) {
      toast.success("Password reset! You can now log in.");
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="flex items-center justify-center py-16">
        <form
          onSubmit={handleSubmit}
          className="card w-96 bg-base-100 p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Set a new password</h2>

          <div className="form-control mb-3">
            <input
              type="password"
              placeholder="New password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-4">
            <input
              type="password"
              placeholder="Confirm new password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset password"}
          </button>
          <p className="text-sm mt-3 text-center">
            <Link to="/login" className="link link-primary">
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
