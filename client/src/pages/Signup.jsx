// /pages/Login.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Login to PeerLance</h2>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
        />
        <button className="btn btn-primary w-full" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
