import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import connectDb from './src/config/dbconfig.js';
import employeeRouter from './src/router/employee.js';
import cookieParser from 'cookie-parser';
import auth from './src/router/login.js';

dotenv.config();
connectDb();

console.log(process.env.name);

const app = express();

// ---------- CORS CONFIG (must come before routes) ----------
const allowedOrigins = [
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((s) => s.trim())
    : []),
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {

  res.send("App is running successfully");

});

app.use("/api/employee", employeeRouter);
app.use("/api/auth", auth);

// ---------- ERROR HANDLER (must come AFTER routes, near the bottom) ----------
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS not allowed for this origin" });
  }
  next(err);
});

// ---------- SERVER START ----------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);