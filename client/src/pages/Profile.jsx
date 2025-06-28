import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react"; // optional: use any icon

const Profile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [studentId, setStudentId] = useState(user?.studentId || "");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        { name, studentId, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update frontend state if successful
      login({
        id: user.id,
        name: res.data.user.name,
        studentId: res.data.user.studentId,
      });

      alert("Profile updated");
      setPassword("");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="w-4 h-4 mr-1" />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="card bg-base-100 shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <div className="p-2 bg-base-200 rounded text-base-content">
              {name}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Student ID</label>
          {isEditing ? (
            <input
              type="text"
              className="input input-bordered w-full"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          ) : (
            <div className="p-2 bg-base-200 rounded text-base-content">
              {studentId}
            </div>
          )}
        </div>

        {isEditing && (
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
            />
          </div>
        )}

        {isEditing && (
          <button className="btn btn-primary w-full" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
