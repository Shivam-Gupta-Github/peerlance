import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrowseJobs from "./pages/BrowseJobs";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import MyApplications from "./pages/MyApplications";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Protected Routes inside layout */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<BrowseJobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
