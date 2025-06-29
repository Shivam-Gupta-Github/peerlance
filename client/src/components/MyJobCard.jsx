import { useEffect, useState } from "react";
import axios from "axios";

const MyJobCard = ({ job }) => {
  const [applicants, setApplicants] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch applicants for this job
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/applications/job/${job._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplicants(res.data);

        const accepted = res.data.find((a) => a.status === "accepted");
        if (accepted) setAssignedTo(accepted.applicant._id);
      } catch (err) {
        console.error("Error loading applicants", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [job._id]);

  const handleAssign = async (applicationId, applicantId) => {
    try {
      // 1. Accept the application
      await axios.patch(
        `${BASE_URL}/api/applications/${applicationId}/status`,
        { status: "accepted" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. Assign the job to the user
      await axios.put(
        `${BASE_URL}/api/jobs/${job._id}/assign`,
        { assignedTo: applicantId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplicants((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, status: "accepted" } : a
        )
      );

      setAssignedTo(applicantId);
      alert("Job assigned and application accepted");
    } catch (err) {
      console.error("Error assigning job", err);
      alert("Failed to assign job");
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/applications/${applicationId}/status`,
        { status: "rejected" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplicants((prev) =>
        prev.map((a) =>
          a._id === applicationId ? { ...a, status: "rejected" } : a
        )
      );

      alert("Application rejected");
    } catch (err) {
      console.error("Error rejecting application", err);
    }
  };

  return (
    <div className="card bg-base-100 shadow p-4 mb-6">
      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{job.description}</p>
      <p className="text-sm text-gray-500 mb-4">
        Budget: ₹{job.budget} | Deadline: {job.deadline?.split("T")[0]}
      </p>

      <p className="font-bold mb-2">Applicants:</p>

      {loading ? (
        <p>Loading applicants...</p>
      ) : applicants.length === 0 ? (
        <p className="text-gray-500">No one has applied yet.</p>
      ) : (
        <ul className="space-y-2">
          {applicants.map((a) => (
            <li
              key={a._id}
              className="flex justify-between items-center bg-base-200 p-2 rounded"
            >
              <span>
                {a.applicant.name} ({a.applicant.studentId})
              </span>
              <div className="flex gap-2">
                {a.status === "accepted" ? (
                  <span className="badge badge-success">Assigned</span>
                ) : a.status === "rejected" ? (
                  <span className="badge badge-error">Rejected</span>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAssign(a._id, a.applicant._id)}
                    >
                      Assign
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleReject(a._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyJobCard;
