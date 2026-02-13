const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ========================
   Middleware
======================== */
app.use(cors());
app.use(express.json()); // Only JSON support

/* ========================
   MongoDB Connection
======================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ========================
   MODELS
======================== */

// User Model
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Donor Model (NO IMAGE FIELD)
const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    address: String,
    district: String,
    bloodGroup: { type: String, required: true },
    healthIssues: { type: String, default: "No" },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);

/* ========================
   ROUTES
======================== */

// Home
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Blood Donor API running",
  });
});

/* ========================
   AUTH ROUTES
======================== */

// Register User
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Login User
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/* ========================
   DONOR ROUTES
======================== */

// Create Donor (JSON only)
app.post("/api/donors", async (req, res) => {
  try {
    const { name, phone, address, district, bloodGroup, healthIssues } =
      req.body;

    if (!name || !phone || !bloodGroup) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone & Blood Group are required",
      });
    }

    const donor = await Donor.create({
      name,
      phone,
      address,
      district,
      bloodGroup,
      healthIssues: healthIssues || "No",
    });

    res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      data: donor,
    });
  } catch (err) {
    console.error("DONOR CREATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get All Donors
app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: donors,
    });
  } catch (err) {
    console.error("DONOR FETCH ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
