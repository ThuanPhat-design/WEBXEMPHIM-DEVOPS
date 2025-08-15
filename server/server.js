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

dotenv.config();

const app = express();

// Cấu hình CORS
const corsOptions = {
  origin: [
    'https://thuanphat-design.github.io',
    'https://thuanphat-design.github.io/WEBXEMPHIM-DEVOPS',
    'http://localhost:3000'
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Xử lý preflight

app.use(express.json());

// Kết nối DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/tmdb", tmdbRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);

// Error handler
app.use(errorHandler);

// 🚀 Quan trọng: Xuất app để Vercel dùng
export default app;
