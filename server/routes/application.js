import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  applyToJob,
  checkIfApplied,
  withdrawApplication,
  getApplicants,
  getMyApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", authMiddleware, applyToJob);
router.get("/check/:jobId", authMiddleware, checkIfApplied);
router.delete("/:jobId", authMiddleware, withdrawApplication);
router.get("/job/:jobId", authMiddleware, getApplicants);
router.get("/my", authMiddleware, getMyApplications);
router.patch("/:id/status", authMiddleware, updateApplicationStatus);

export default router;
