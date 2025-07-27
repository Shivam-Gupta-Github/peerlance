import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      await axios.post(
        `${BASE_URL}/api/jobs`,
        {
          title,
          description,
          budget: parseFloat(budget),
          deadline,
          tags: tags
            .split(" ")
            .map((tag) => tag.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job posted successfully!");
      navigate("/"); // Go back to jobs page
    } catch (err) {
      alert("Error posting job");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Budget (INR)"
          className="input input-bordered w-full"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Deadline"
          className="input input-bordered w-full"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (space separated)"
          className="input input-bordered w-full"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-full">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
