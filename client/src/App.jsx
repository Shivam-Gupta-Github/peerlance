import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrowseJobs from "./pages/BrowseJobs";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import MyApplications from "./pages/MyApplications";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />

        {/* Protected Routes inside layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BrowseJobs />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PostJob />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyJobs />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyApplications />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
