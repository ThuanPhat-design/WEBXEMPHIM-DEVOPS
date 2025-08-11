import express from "express";
import { tmdbFill } from "../Controllers/tmdbController.js";
const router = express.Router();

// POST /api/movies/tmdb-fill
router.post("/tmdb-fill", tmdbFill);

export default router;
