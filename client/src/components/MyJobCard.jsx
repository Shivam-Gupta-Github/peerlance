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
      } catch (err) {
        console.error("Error loading applicants", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [job._id]);

  const handleAssign = async (applicantId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${job._id}/assign`,
        { assignedTo: applicantId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssignedTo(applicantId);
      alert("Job assigned successfully");
    } catch (err) {
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
              {assignedTo === a.applicant._id ? (
                <span className="badge badge-success">Assigned</span>
              ) : (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAssign(a.applicant._id)}
                >
                  Assign
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyJobCard;
