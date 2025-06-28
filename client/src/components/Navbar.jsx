import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="navbar bg-base-300 text-base-content shadow fixed top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          PeerLance
        </Link>
      </div>

      {/* Desktop right side */}
      <div className="hidden md:flex items-center gap-4">
        <p className="font-medium">{user.name}</p>
        <button className="btn btn-outline btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Mobile hamburger menu */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <Menu />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <span className="font-semibold">{user.name}</span>
          </li>
          <li>
            <Link to="/">Browse Jobs</Link>
          </li>
          <li>
            <Link to="/post-job">Post Job</Link>
          </li>
          <li>
            <Link to="/my-jobs">My Jobs</Link>
          </li>
          <li>
            <Link to="/applications">Applications</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
