import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-[calc(100vh-64px)] p-4 bg-base-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
