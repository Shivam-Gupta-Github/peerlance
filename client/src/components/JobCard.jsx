import { useEffect, useState } from "react";
import axios from "axios";
import ApplyModal from "./ApplyModal";

const JobCard = ({ job }) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkApplication = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          `${BASE_URL}/api/applications/check/${job._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.applied) {
          setApplied(true);
        }
      } catch (err) {
        console.error("Failed to check application");
      }
    };

    checkApplication();
  }, [job._id]);

  const handleWithdraw = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      await axios.delete(`${BASE_URL}/api/applications/${job._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplied(false);
    } catch (err) {
      alert("Failed to withdraw application");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    setShowModal(true);
  };

  return (
    <div className="card bg-base-100 shadow p-4">
      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{job.description}</p>
      <p className="text-sm text-gray-500 mb-2">
        Budget: ₹{job.budget} | Deadline: {job.deadline?.split("T")[0]}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Posted by: {job.postedBy.name}({job.postedBy.studentId})
      </p>

      <div className="flex gap-2 mb-3 flex-wrap">
        {job.tags?.map((tag) => (
          <span key={tag} className="badge badge-outline text-xs">
            {tag}
          </span>
        ))}
      </div>

      {applied ? (
        <div className="flex gap-2">
          <button className="btn btn-sm btn-disabled w-50 hidden lg:block">
            Applied
          </button>
          <button
            className="btn btn-sm btn-outline btn-error w-50"
            onClick={handleWithdraw}
            disabled={loading}
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <button
            className="btn btn-sm btn-soft btn-primary w-50"
            onClick={handleApplyClick}
            disabled={loading}
          >
            Apply
          </button>
          {showModal && (
            <ApplyModal
              jobId={job._id}
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                setApplied(true);
                setShowModal(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default JobCard;
