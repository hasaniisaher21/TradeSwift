import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user.email || !user.password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", user);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing Up..." : "Signup"}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "320px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", fontSize: "14px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  error: { color: "red", fontSize: "14px" },
};

export default Signup;
