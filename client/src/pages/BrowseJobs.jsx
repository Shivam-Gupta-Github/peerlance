import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";

const BrowseJobs = () => {
  const { user, authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wait until auth finishes
    if (authLoading) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");

        const filteredJobs = user?.id
          ? res.data.filter((job) => job.postedBy?._id !== user.id)
          : res.data;

        setJobs(filteredJobs);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [authLoading, user?.id]); // now triggers again when user loads

  if (loading || authLoading) {
    return <div className="p-8 text-center text-lg">Loading jobs...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
      <div className="filter mb-6">
        <input
          className="btn filter-reset"
          type="radio"
          name="metaframeworks"
          aria-label="All"
        />
        <input
          className="btn"
          type="radio"
          name="metaframeworks"
          aria-label="file"
        />
        <input
          className="btn"
          type="radio"
          name="metaframeworks"
          aria-label="printing"
        />
        <input
          className="btn"
          type="radio"
          name="metaframeworks"
          aria-label="writing"
        />
      </div>
      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs available right now.</p>
        ) : (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
