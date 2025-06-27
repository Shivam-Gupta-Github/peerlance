import express from "express";
import Application from "../models/Application.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

// Apply to a job
router.post("/", authMiddleware, async (req, res) => {
  const { jobId } = req.body;

  try {
    // Check if already applied
    const existing = await Application.findOne({
      jobId,
      applicant: req.user,
    });

    if (existing) {
      return res.status(400).json({ msg: "You already applied to this job" });
    }

    const newApplication = new Application({
      jobId,
      applicant: req.user,
    });

    await newApplication.save();
    res.status(201).json({ msg: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Check if user has already applied to a job
router.get("/check/:jobId", authMiddleware, async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const existing = await Application.findOne({
      jobId,
      applicant: req.user,
    });

    res.json({ applied: !!existing });
  } catch (err) {
    res.status(500).json({ msg: "Error checking application" });
  }
});

// Withdraw application
router.delete("/:jobId", authMiddleware, async (req, res) => {
  const { jobId } = req.params;

  try {
    const deleted = await Application.findOneAndDelete({
      jobId,
      applicant: req.user,
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Application not found" });
    }

    res.json({ msg: "Application withdrawn successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to withdraw application" });
  }
});

router.get("/job/:jobId", authMiddleware, async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const applications = await Application.find({ jobId })
      .populate("applicant", "name studentId") // just needed fields
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch applicants" });
  }
});

export default router;
