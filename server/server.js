import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.js";
import jobRoutes from "./routes/job.js";
import applicationRoutes from "./routes/application.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
