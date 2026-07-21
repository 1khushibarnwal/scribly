import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/useAuth";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signup(form);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="card w-96 bg-base-200 p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        {error && <p className="text-error mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
        <p className="text-sm mt-3">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
