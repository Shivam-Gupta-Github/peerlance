import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="navbar bg-base-300 text-base-content shadow fixed top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">PeerLance</a>
      </div>
      <div className="flex">
        <p className="fond-medium mr-4 mt-2">{user.name}</p>
        <button className="btn btn-outline btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
