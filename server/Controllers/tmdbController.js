// server/controllers/tmdbController.js
import { searchMovie, getMovieDetails, getMovieCredits } from "../config/tmdb.js";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export async function tmdbFill(req, res) {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Missing title" });

    // 1) Search
    const results = await searchMovie(title);
    if (!results.length) {
      return res.status(404).json({ error: "Phim không tìm thấy" });
    }
    const movieId = results[0].id;

    // 2) Details
    const details = await getMovieDetails(movieId);

    // 3) Credits
    const credits = await getMovieCredits(movieId);

    // Build payload
    const payload = {
      time: details.runtime,
      year: details.release_date?.slice(0, 4) || "",
      language: details.original_language,
      desc: details.overview,
      poster: details.poster_path
        ? `${IMG_BASE}${details.poster_path}`
        : null,
      genres: details.genres.map((g) => g.name),
      cast: (credits.cast || [])
        .slice(0, 5)
        .map((c) => ({
          id: c.id,
          name: c.name,
          character: c.character,
          image: c.profile_path
            ? `${IMG_BASE}${c.profile_path}`
            : null
        }))
    };

    return res.json(payload);
  } catch (err) {
    console.error("tmdbFill error:", err);
    return res.status(500).json({ error: "Server lỗi" });
  }
}
