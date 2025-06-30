import Application from "../models/Application.js";

// Apply to a job
export const applyToJob = async (req, res) => {
  const { jobId } = req.body;
  try {
    const existing = await Application.findOne({ jobId, applicant: req.user });
    if (existing) {
      return res.status(400).json({ msg: "You already applied to this job" });
    }

    const newApplication = new Application({ jobId, applicant: req.user });
    await newApplication.save();

    res.status(201).json({ msg: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Check if user applied
export const checkIfApplied = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const existing = await Application.findOne({ jobId, applicant: req.user });
    res.json({ applied: !!existing });
  } catch (err) {
    res.status(500).json({ msg: "Error checking application" });
  }
};

// Withdraw application
export const withdrawApplication = async (req, res) => {
  const { jobId } = req.params;
  try {
    const deleted = await Application.findOneAndDelete({
      jobId,
      applicant: req.user,
    });

    if (!deleted) return res.status(404).json({ msg: "Application not found" });
    res.json({ msg: "Application withdrawn successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to withdraw application" });
  }
};

// Get all applicants for a job
export const getApplicants = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const applications = await Application.find({ jobId })
      .populate("applicant", "name studentId")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch applicants" });
  }
};

// Get my applications
export const getMyApplications = async (req, res) => {
  try {
    const myApplications = await Application.find({ applicant: req.user })
      .populate("jobId")
      .sort({ appliedAt: -1 });

    res.json(myApplications);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const application = await Application.findById(req.params.id).populate(
      "jobId"
    );

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.jobId.postedBy.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json({ message: "Status updated", application });
  } catch (err) {
    console.error("Failed to update application status:", err);
    res.status(500).json({ message: "Server error" });
  }
};
