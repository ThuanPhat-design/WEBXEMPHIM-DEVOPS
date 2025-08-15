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

app.use(cors({
  origin: [
    'https://thuanphat-design.github.io/WEBXEMPHIM-DEVOPS', // đúng domain GitHub Pages
    'http://localhost:3000' // để test local
  ],
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());



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
