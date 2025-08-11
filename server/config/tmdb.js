// server/utils/tmdb.js
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY;

export async function searchMovie(title) {
  const url = `${BASE_URL}/search/movie?api_key=${KEY}&query=${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB search error (${res.status})`);
  const { results } = await res.json();
  return results || [];
}

export async function getMovieDetails(id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${KEY}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB detail error (${res.status})`);
  return await res.json();
}

export async function getMovieCredits(id) {
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB credits error (${res.status})`);
  return await res.json();
}
