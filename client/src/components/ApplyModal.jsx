import { useState } from "react";
import axios from "axios";

const ApplyModal = ({ jobId, onClose, onSuccess }) => {
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!contact || !comment) {
      setError("Contact and comment are required.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/applications`,
        { jobId, contact, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSuccess();
    } catch (err) {
      setError("Failed to apply");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Apply for Job</h3>

        <input
          className="input input-bordered w-full mb-3"
          placeholder="Your Contact (Phone / Email)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <textarea
          className="textarea textarea-bordered w-full mb-3"
          placeholder="Write your proposal..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
