import Job from "../models/Job.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, description, budget, deadline, tags } = req.body;

    const newJob = new Job({
      title,
      description,
      budget,
      deadline,
      tags,
      postedBy: req.user,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ msg: "Error creating job", error: err.message });
  }
};

// Get all open jobs (optionally filter by tag)
export const getAllJobs = async (req, res) => {
  try {
    const tagQuery = req.query.tag;
    // const filter = { status: "open" }; // filter for open jobs
    const filter = {}; // Adjusted to fetch all jobs, not just open ones

    if (tagQuery) {
      filter.tags = tagQuery.toLowerCase();
    }

    const jobs = await Job.find(filter).populate("postedBy", "name studentId");
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching jobs", error: err.message });
  }
};

// Get jobs posted by logged-in user
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching your jobs" });
  }
};

// Assign a job to a user
export const assignJob = async (req, res) => {
  const { jobId } = req.params;
  const { assignedTo } = req.body;

  try {
    const job = await Job.findOne({ _id: jobId, postedBy: req.user });

    if (!job) {
      return res.status(404).json({ msg: "Job not found or not yours" });
    }

    job.assignedTo = assignedTo;
    await job.save();

    res.json({ msg: "Job assigned successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to assign job" });
  }
};
