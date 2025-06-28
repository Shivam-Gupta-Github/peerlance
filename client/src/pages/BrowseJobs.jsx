import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

const BrowseJobs = () => {
  const { user, authLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState(""); // tag filter
  const [availableTags, setAvailableTags] = useState([]);

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
        setFilteredJobs(filteredJobs);
        // Get top 10 tags from jobs
        const tags = new Set();
        filteredJobs.forEach((job) => {
          job.tags?.forEach((tag) => tags.add(tag));
        });
        setAvailableTags([...tags].slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [authLoading, user?.id]); // now triggers again when user loads

  // Filter jobs based on selected tag
  useEffect(() => {
    if (!activeFilter) {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.tags?.includes(activeFilter)));
    }
  }, [activeFilter, jobs]);

  if (loading || authLoading) {
    return <div className="p-8 text-center text-lg">Loading jobs...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>

      <div className="filter mb-6 flex gap-2 items-center flex-wrap">
        {activeFilter ? (
          <>
            <button className="btn btn-sm" onClick={() => setActiveFilter("")}>
              <X className="w-4 h-4" />
            </button>
            <span className="btn btn-sm btn-active">{activeFilter}</span>
          </>
        ) : (
          availableTags.map((tag) => (
            <button
              key={tag}
              className="btn btn-sm"
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))
        )}
      </div>

      <div className="grid gap-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs available right now.</p>
        ) : (
          filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
