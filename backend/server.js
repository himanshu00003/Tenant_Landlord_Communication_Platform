// server.js - FULL FIXED CODE (Based on your provided code and common fixes)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

app.options(
  "*",
  cors({
    origin: [
  "http://localhost:5173",
  "https://landloard-tanent-frontend.onrender.com",
  "https://tenant-project.netlify.app",
],
    credentials: true,
  })
);

app.use(
  cors({
    origin: [
  "http://localhost:5173",
  "https://landloard-tanent-frontend.onrender.com",
  "https://tenant-project.netlify.app",
],
    credentials: true,
  })
);

app.use(express.json());

// Test Route (Health Check - Publicly Accessible)
app.get("/api/health", (req, res) => {
  // Added /api prefix
  res.send({
    activeStatus: true,
    error: false,
    message: "Server is healthy",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/maintenance", require("./routes/maintenance"));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
