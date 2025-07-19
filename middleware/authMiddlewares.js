const JWT = require('jsonwebtoken');
const userModel = require("../models/userModel");
require('dotenv').config();

// Middleware: Require user to be signed in (token verification)
exports.requireSignIn = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization;

    // If no token is provided, deny access
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // Verify the token using the secret key from environment variables
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware: Check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    // Find user in the database by ID from the decoded token
    const user = await userModel.findById(req.user._id);

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user's role is admin (role === 1)
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // If user is admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error in admin middleware",
      error: error.message,
    });
  }
};
