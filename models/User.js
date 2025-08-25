const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    // Name field - required string
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    // Email field - required, unique string
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    // Age field - optional number with validation
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Age cannot exceed 120"],
    },

    // City field - optional string
    city: {
      type: String,
      trim: true,
    },
  },
  {
    // Add timestamps (createdAt, updatedAt)
    timestamps: true,
  }
);

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
