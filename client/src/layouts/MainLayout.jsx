import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-4 bg-base-100">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
