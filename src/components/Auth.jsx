import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

// Backend API base URL (PORT=3000 in .env)
const API_BASE_URL = "http://localhost:3000/api";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const isLogin = mode === "login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const body =
        mode === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || (isLogin ? "Login failed" : "Registration failed"));
      }

      // Store token and user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? "Signing in..." : "Registering...") : isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" className="auth-toggle" onClick={toggleMode}>
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

