import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        studentId,
        password,
      });

      // Backend returns token
      localStorage.setItem("token", res.data.token);
      login({ name, studentId }); // optional

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Signup for PeerLance
        </h2>

        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Student ID"
          className="input input-bordered w-full mb-3"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

        <button className="btn btn-primary w-full" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
