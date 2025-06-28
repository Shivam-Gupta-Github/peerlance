import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { loggedIn, login } = useAuth();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submit behavior
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        studentId,
        password,
      });

      localStorage.setItem("token", res.data.token);

      // store user info in context
      login({ name: res.data.name, studentId: res.data.studentId });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-85 sm:w-100 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login to PeerLance
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Student ID"
            className="input input-bordered w-full mb-3"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
