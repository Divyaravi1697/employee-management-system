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

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {

  res.send("App is running successfully");

});

app.use("/api/employee", employeeRouter);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);