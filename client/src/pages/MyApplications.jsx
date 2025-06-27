import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched applications:", res.data);
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => {
            const job = app.jobId;
            return (
              <div
                key={app._id}
                className="card bg-base-100 shadow p-4 border border-base-200"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
                <div className="text-sm mt-2">
                  <span className="font-medium">Budget:</span> ₹{job.budget}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Deadline:</span>{" "}
                  {new Date(job.deadline).toLocaleDateString()}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`badge ${
                      app.status === "accepted"
                        ? "badge-success"
                        : app.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
