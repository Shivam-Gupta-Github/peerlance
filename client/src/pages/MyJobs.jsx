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

        const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Posted Jobs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted.</p>
      ) : (
        jobs.map((job) => <MyJobCard key={job._id} job={job} />)
      )}
    </div>
  );
};

export default MyJobs;
