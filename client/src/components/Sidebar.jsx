import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      role="tablist"
      className="tabs fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-base-200 p-4 flex flex-col gap-2 z-40"
    >
      <Link
        to="/"
        role="tab"
        className={`tab btn btn-ghost justify-start ${
          currentPath === "/" ? "tab-active" : ""
        }`}
      >
        Browse Jobs
      </Link>
      <Link
        to="/post-job"
        role="tab"
        className={`tab btn btn-ghost justify-start ${
          currentPath === "/post-job" ? "tab-active" : ""
        }`}
      >
        Post Job
      </Link>
      <Link
        to="/my-jobs"
        role="tab"
        className={`tab btn btn-ghost justify-start ${
          currentPath === "/my-jobs" ? "tab-active" : ""
        }`}
      >
        My Jobs
      </Link>
      <Link
        to="/applications"
        role="tab"
        className={`tab btn btn-ghost justify-start ${
          currentPath === "/applications" ? "tab-active" : ""
        }`}
      >
        Applications
      </Link>
      <Link
        to="/profile"
        role="tab"
        className={`tab btn btn-ghost justify-start ${
          currentPath === "/applications" ? "tab-active" : ""
        }`}
      >
        Profile
      </Link>
    </div>
  );
};

export default Sidebar;
