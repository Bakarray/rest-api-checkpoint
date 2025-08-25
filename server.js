// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const mongoose = require("mongoose");

// Import User model
const User = require("./models/User");

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Get port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if cannot connect to database
  });

// Routes

/**
 * GET /api/users
 * RETURN ALL USERS
 * This route fetches all users from the database
 */
app.get("/api/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Send success response with users data
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: error.message,
    });
  }
});

/**
 * POST /api/users
 * ADD A NEW USER TO THE DATABASE
 * This route creates a new user with the provided data
 */
app.post("/api/users", async (req, res) => {
  try {
    // Create a new user with the request body data
    const user = new User(req.body);

    // Save the user to the database
    const savedUser = await user.save();

    // Send success response with created user data
    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    // Handle duplicate key error (email already exists)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Handle other errors
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating user",
      error: error.message,
    });
  }
});

/**
 * PUT /api/users/:id
 * EDIT A USER BY ID
 * This route updates a user with the specified ID
 */
app.put("/api/users/:id", async (req, res) => {
  try {
    // Extract user ID from URL parameters
    const userId = req.params.id;

    // Update user with the provided data
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response with updated user data
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Handle other errors
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating user",
      error: error.message,
    });
  }
});

/**
 * DELETE /api/users/:id
 * REMOVE A USER BY ID
 * This route deletes a user with the specified ID
 */
app.delete("/api/users/:id", async (req, res) => {
  try {
    // Extract user ID from URL parameters
    const userId = req.params.id;

    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if user was found and deleted
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Handle other errors
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/users`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});
