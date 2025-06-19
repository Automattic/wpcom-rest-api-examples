/* global process */
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { TOKEN_URL } from "./config.js";
dotenv.config();

const { VITE_WPCC_CLIENT_ID, VITE_WPCC_CLIENT_SECRET } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

// Async handler utility
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.post(
  "/api/exchange-token",
  asyncHandler(async (req, res) => {
    const { code, redirect_uri } = req.body;
    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        client_id: VITE_WPCC_CLIENT_ID,
        client_secret: VITE_WPCC_CLIENT_SECRET,
        redirect_uri,
        code,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.json(response.data);
  })
);

// Centralized error handler
app.use((err, req, res) => {
  res.status(500).json({
    error: err.message,
    details: err.response?.data,
  });
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
