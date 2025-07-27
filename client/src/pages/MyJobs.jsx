import { useEffect, useState } from "react";
import axios from "axios";
import MyJobCard from "../components/MyJobCard";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const BASE_URL = import.meta.env.VITE_BACKEND_URL;

        const res = await axios.get(`${BASE_URL}/api/jobs/my-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch your jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100%]">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const BASE_URL = import.meta.env.VITE_BACKEND_URL;

      await axios.delete(`${BASE_URL}/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs((prevJobs) => prevJobs.filter((j) => j._id !== jobId));
      alert("Job deleted successfully");
    } catch (err) {
      console.error("Error deleting job", err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted.</p>
      ) : (
        jobs.map((job) => (
          <MyJobCard key={job._id} job={job} handleDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default MyJobs;
