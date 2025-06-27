import { useEffect, useState } from "react";
import axios from "axios";

const MyJobCard = ({ job }) => {
  const [applicants, setApplicants] = useState([]);
  const [assignedTo, setAssignedTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/applications/job/${job._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplicants(res.data);

        const accepted = res.data.find((a) => a.status === "accepted");
        if (accepted) {
          setAssignedTo(accepted.applicant._id);
        }
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
      // 1. Mark application as accepted
      await axios.patch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        { status: "accepted" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. Assign user to job
      await axios.put(
        `http://localhost:5000/api/jobs/${job._id}/assign`,
        { assignedTo: applicantId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 3. Update local state to reflect status
      setApplicants((prev) =>
        prev.map((a) => {
          if (a._id === applicationId) {
            return { ...a, status: "accepted" };
          } else if (a.status === "pending") {
            return { ...a, status: "rejected" };
          }
          return a;
        })
      );

      setAssignedTo(applicantId);
      alert("Job assigned successfully");
    } catch (err) {
      console.error("Error assigning job:", err);
      alert("Error assigning job");
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
              <div>
                {a.status === "accepted" ? (
                  <span className="badge badge-success">Assigned</span>
                ) : a.status === "rejected" ? (
                  <span className="badge badge-error">Rejected</span>
                ) : (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAssign(a._id, a.applicant._id)}
                  >
                    Assign
                  </button>
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
