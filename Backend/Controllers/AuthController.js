const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    // Convert email to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      success: true,
      role: user.role,
    });
  } catch (err) {
    console.error("Signup error:", err);

    // Handle duplicate key error specifically
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
        error: "duplicate_email",
      });
    }

    res.status(500).json({
      message: "Internal server error during registration",
      success: false,
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required",
        success: false,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await UserModel.findOne({
      email: normalizedEmail,
      role: role, // Add role to the query
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email, password, or role",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email, password, or role",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error during login",
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
