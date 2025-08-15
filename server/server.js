import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/UserRouter.js";
import { errorHandler } from './middlewares/errorMiddleware.js';
import moviesRouter from "./Routes/MoviesRouter.js";
import categoriesRouter from './Routes/CategoriesRouter.js';
import Uploadrouter from './Controllers/UploadFile.js';
import tmdbRouter from './Routes/tmdbRouter.js';
import { searchMovie, getMovieDetails } from "./config/tmdb.js";
dotenv.config();

const app = express();
import cors from 'cors';

app.use(cors({
  origin: [
    'https://thuanphat-design.github.io/WEBXEMPHIM-DEVOPS', // domain frontend thật sự
    'http://localhost:3000'
  ],
  credentials: true
}));


app.use(express.json());

// Kết nối DB
connectDB();


app.use("/api/movies", tmdbRouter);

// === Các route khác ra ngoài callback ===
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);

// error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
