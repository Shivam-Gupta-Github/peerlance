import mongoose from "mongoose";
import Application from "./Application.js"; // Import Application model for pre-delete hook

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  tags: [
    {
      type: String,
      lowercase: true,
      trim: true,
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "assigned", "completed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

jobSchema.pre("findOneAndDelete", async function (next) {
  const job = await this.model.findOne(this.getFilter());
  if (job) {
    await Application.deleteMany({ jobId: job._id });
  }
  next();
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
