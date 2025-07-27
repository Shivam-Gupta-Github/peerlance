import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  createJob,
  getAllJobs,
  getMyJobs,
  assignJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/my-jobs", authMiddleware, getMyJobs);
router.put("/:jobId/assign", authMiddleware, assignJob);
router.delete("/:jobId", authMiddleware, deleteJob);

export default router;
