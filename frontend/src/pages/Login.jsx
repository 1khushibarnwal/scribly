import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(form);
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
        <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
        {error && <p className="text-error mb-2">{error}</p>}
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
          {loading ? "Logging in..." : "Log in"}
        </button>
        <p className="text-sm mt-3">
          No account yet?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
