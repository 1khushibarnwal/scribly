import { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);

    if (result.success) {
      setSent(true);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="flex items-center justify-center py-16">
        <div className="card w-96 bg-base-100 p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Reset your password</h2>

          {sent ? (
            <p className="text-sm text-base-content/70">
              If an account exists for <strong>{email}</strong>, a reset link
              has been sent. Check your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          <p className="text-sm mt-3 text-center">
            <Link to="/login" className="link link-primary">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
