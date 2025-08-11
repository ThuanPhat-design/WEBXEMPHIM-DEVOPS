import express from "express";
import { getAllAccountPlans } from "../Controllers/AccountPlansController.js";

const router = express.Router();

// Định tuyến lấy tất cả gói tài khoản
router.get("/accountplans", getAllAccountPlans);

export default router;
