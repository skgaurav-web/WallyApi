const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, profilePic, instaLink, threadsLink, xLink, userRole } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent unauthorized users from registering as admin
    if (userRole === "admin") {
      return res.status(403).json({ message: "Cannot register as admin directly" });
    }

    const existingUser = await UserModel.findByEmail(email); // ✅ Correct method

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await UserModel.registerUser(name, email, phone, password, profilePic, instaLink, threadsLink, xLink, userRole);


    res.status(201).json({ message: "User registered successfully", userId: newUser.id, role: newUser.userRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token with userRole included
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.userRole },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, role: user.userRole },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

