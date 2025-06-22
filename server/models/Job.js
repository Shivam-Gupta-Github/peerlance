import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  budget: Number,
  category: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["open", "assigned", "completed"],
    default: "open",
  },
});

export default mongoose.model("Job", jobSchema);
