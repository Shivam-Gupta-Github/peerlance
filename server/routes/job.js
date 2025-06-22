import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Create a job (Only for logged-in users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const newJob = new Job({
      title,
      description,
      price,
      category,
      postedBy: req.user, // injected by middleware
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ msg: "Error posting job", error: err.message });
  }
});

export default router;
